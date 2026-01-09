#include "Server.hpp"
#include <iostream>
#include <vector>
#include <boost/asio.hpp>
#include "pb_encode.h"
#include "pb_decode.h"

// Helper to encode generic message
std::vector<uint8_t> encode_message(const Message& msg) {
    size_t size;
    pb_get_encoded_size(&size, Message_fields, &msg);
    std::vector<uint8_t> buf(size);
    pb_ostream_t stream = pb_ostream_from_buffer(buf.data(), size);
    if (!pb_encode(&stream, Message_fields, &msg)) return {};
    return buf;
}

Server::Server(boost::asio::io_context& io_context, short port)
    : io_context_(io_context), acceptor_(io_context, tcp::endpoint(tcp::v4(), port)) {
    do_accept();
}

void Server::do_accept() {
    acceptor_.async_accept(
        [this](boost::system::error_code ec, tcp::socket socket) {
            if (!ec) {
                std::make_shared<Session>(std::move(socket), crypto_handler_)->start();
            }
            do_accept();
        });
}

Session::Session(tcp::socket socket, CryptoHandler& crypto_handler)
    : socket_(std::move(socket)), crypto_handler_(crypto_handler) {}

void Session::start() {
    do_read_header();
}

void Session::do_read_header() {
    auto self(shared_from_this());
    auto header = std::make_shared<std::vector<uint8_t>>(4);
    boost::asio::async_read(socket_, boost::asio::buffer(*header),
        [this, self, header](boost::system::error_code ec, std::size_t /*length*/) {
            if (!ec) {
                uint32_t body_len = 
                    (static_cast<uint32_t>((*header)[0]) << 24) |
                    (static_cast<uint32_t>((*header)[1]) << 16) |
                    (static_cast<uint32_t>((*header)[2]) << 8) |
                    (static_cast<uint32_t>((*header)[3]));
                
                if (body_len == 0 || body_len > 1024 * 1024) return;
                do_read_body(body_len);
            }
        });
}

void Session::do_read_body(uint32_t length) {
    auto self(shared_from_this());
    read_buffer_.resize(length);
    boost::asio::async_read(socket_, boost::asio::buffer(read_buffer_),
        [this, self](boost::system::error_code ec, std::size_t /*length*/) {
            if (!ec) {
                handle_message(read_buffer_);
                do_read_header();
            }
        });
}

void Session::handle_message(const std::vector<uint8_t>& data) {
    Message msg = Message_init_zero;
    pb_istream_t stream = pb_istream_from_buffer(data.data(), data.size());
    if (!pb_decode(&stream, Message_fields, &msg)) return;

    switch (msg.type) {
        case Message_Type_AUTH_INIT:
            if (msg.which_payload == Message_auth_init_tag) 
                handle_auth_init(msg.payload.auth_init);
            break;
        case Message_Type_AUTH_RESPONSE:
            if (msg.which_payload == Message_auth_response_tag) 
                handle_auth_response(msg.payload.auth_response);
            break;
        case Message_Type_RANGE_PROOF_REQUEST:
            if (msg.which_payload == Message_range_proof_request_tag) 
                handle_range_proof_request(msg.payload.range_proof_request);
            break;
        default: break;
    }
}

void Session::handle_auth_init(const AuthInit& auth_init) {
    std::string serial_id(auth_init.serial_id);
    std::vector<uint8_t> sig(auth_init.signature.bytes, auth_init.signature.bytes + auth_init.signature.size);

    std::vector<uint8_t> data(serial_id.begin(), serial_id.end());
    std::vector<uint8_t> hash = crypto_handler_.sha256(data);
    
    // In a real system you must ADD the client key first. 
    // This example assumes the server trusts the signature for the demo or has the key.
    
    if (crypto_handler_.verify_client_signature(serial_id, hash, sig)) {
        std::cout << "Client " << serial_id << " signature verified." << std::endl;
        client_serial_id_ = serial_id;
        
        current_challenge_ = crypto_handler_.get_random_bytes(32);
        
        Message resp = Message_init_zero;
        resp.type = Message_Type_AUTH_CHALLENGE;
        resp.which_payload = Message_auth_challenge_tag;
        
        memcpy(resp.payload.auth_challenge.random_number.bytes, current_challenge_.data(), 32);
        resp.payload.auth_challenge.random_number.size = 32;
        
        std::vector<uint8_t> hash_rnd = crypto_handler_.sha256(current_challenge_);
        std::vector<uint8_t> s_sig = crypto_handler_.sign_message(hash_rnd);
        
        memcpy(resp.payload.auth_challenge.signature.bytes, s_sig.data(), s_sig.size());
        resp.payload.auth_challenge.signature.size = static_cast<uint8_t>(s_sig.size());
        
        send_message(resp);
    } else {
        std::cout << "Auth verify failed for " << serial_id << std::endl;
    }
}

void Session::handle_auth_response(const AuthResponse& auth_response) {
    if (current_challenge_.empty()) return;
    
    std::vector<uint8_t> sig(auth_response.signature.bytes, auth_response.signature.bytes + auth_response.signature.size);
    
    std::vector<uint8_t> hash_rnd = crypto_handler_.sha256(current_challenge_);
    
    if (crypto_handler_.verify_client_signature(client_serial_id_, hash_rnd, sig)) {
        std::cout << "Client " << client_serial_id_ << " challenge verified." << std::endl;
        authenticated_ = true;
        
        Message resp = Message_init_zero;
        resp.type = Message_Type_AUTH_RESULT;
        resp.which_payload = Message_auth_result_tag;
        resp.payload.auth_result.success = true;
        send_message(resp);
    } else {
        std::cout << "Challenge verification failed." << std::endl;
        Message resp = Message_init_zero;
        resp.type = Message_Type_AUTH_RESULT;
        resp.which_payload = Message_auth_result_tag;
        resp.payload.auth_result.success = false;
        send_message(resp);
    }
}

void Session::handle_range_proof_request(const RangeProofRequest& req) {
    if (!authenticated_) return;
    
    std::cout << "Received Range Proof Request. Range: [" << req.min_value << ", " << req.max_value << "]" << std::endl;
    
    std::vector<uint8_t> c0(req.c0.bytes, req.c0.bytes + req.c0.size);
    std::vector<uint8_t> c1(req.c1.bytes, req.c1.bytes + req.c1.size);
    std::vector<uint8_t> c2(req.c2.bytes, req.c2.bytes + req.c2.size);
    std::vector<uint8_t> c3(req.c3.bytes, req.c3.bytes + req.c3.size);
    std::vector<uint8_t> rc1(req.range_c1.bytes, req.range_c1.bytes + req.range_c1.size);
    std::vector<uint8_t> rc2(req.range_c2.bytes, req.range_c2.bytes + req.range_c2.size);
    
    bool result = crypto_handler_.verify_range_proof(
        req.min_value, req.max_value,
        c0, c1, c2, c3, rc1, rc2
    );
    
    std::cout << "Verification Result: " << (result ? "SUCCESS" : "FAILURE") << std::endl;
    
    Message resp = Message_init_zero;
    resp.type = Message_Type_RANGE_PROOF_RESULT;
    resp.which_payload = Message_range_proof_result_tag;
    resp.payload.range_proof_result.success = result;
    send_message(resp);
}

void Session::send_message(const Message& msg) {
    std::vector<uint8_t> data = encode_message(msg);
    uint32_t len = static_cast<uint32_t>(data.size());
    
    auto buffer = std::make_shared<std::vector<uint8_t>>();
    buffer->resize(4 + len);
    (*buffer)[0] = (len >> 24) & 0xFF;
    (*buffer)[1] = (len >> 16) & 0xFF;
    (*buffer)[2] = (len >> 8) & 0xFF;
    (*buffer)[3] = len & 0xFF;
    std::copy(data.begin(), data.end(), buffer->begin() + 4);

    auto self(shared_from_this());
    boost::asio::async_write(socket_, boost::asio::buffer(*buffer),
        [this, self, buffer](boost::system::error_code ec, std::size_t /*length*/) { });
}
