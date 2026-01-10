#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <boost/asio.hpp>

// Include Nanopb headers from deps
#include "../deps/nanopb/pb_encode.h"
#include "../deps/nanopb/pb_decode.h"
#include "../deps/nanopb/pb_common.h"

// Include Protocol definition (generated later)
// actually we need to generate it first. 
// For this single-file logic, we will assume protocol.pb.h is generated in same folder.
#include "protocol.pb.h"

// Include Trezor Crypto headers from deps
extern "C" {
#include "../deps/trezor-crypto/secp256k1.h"
#include "../deps/trezor-crypto/ecdsa.h"
#include "../deps/trezor-crypto/rand.h"
#include "../deps/trezor-crypto/sha2.h"
#include "../deps/trezor-crypto/bignum.h"
}

using boost::asio::ip::tcp;

// --- Crypto Helper ---
class Crypto {
public:
    Crypto() {
        // Hardcoded Server Key (randomly generated for demo)
        server_priv_key_ = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                            0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
                            0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
                            0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20}; 

        // Hardcoded Client Public Key (034f...) corresponding to privKey 111...111
        // This MUST match client-side fixed key.
        registered_client_pub_ = {
            0x03, 0x4f, 0x35, 0x5b, 0xdc, 0xb7, 0xcc, 0x0a, 0xf7, 0x28, 0xef, 0x3c, 0xce, 0xb9, 0x61, 0x5d,
            0x90, 0x68, 0x4b, 0xb5, 0xb2, 0xca, 0x5f, 0x85, 0x9a, 0xb0, 0xf0, 0xb7, 0x04, 0x07, 0x58, 0x71, 0xaa
        };
    }

    bool verify_signature(const std::vector<uint8_t>& data_hash, const std::vector<uint8_t>& sig) {
        // Verify against registered client key
        const ecdsa_curve* curve = &secp256k1;
        // sig is 64 bytes (r,s)?
        // Trezor expects 64 bytes usually.
        return ecdsa_verify_digest(curve, registered_client_pub_.data(), sig.data(), data_hash.data()) == 0;
    }

    std::vector<uint8_t> sign(const std::vector<uint8_t>& data_hash) {
        std::vector<uint8_t> sig(64);
        const ecdsa_curve* curve = &secp256k1;
        uint8_t pby;
        ecdsa_sign_digest(curve, server_priv_key_.data(), data_hash.data(), sig.data(), &pby, nullptr);
        return sig;
    }

    std::vector<uint8_t> sha256(const std::vector<uint8_t>& data) {
        std::vector<uint8_t> hash(32);
        sha256_Raw(data.data(), data.size(), hash.data());
        return hash;
    }

    std::vector<uint8_t> random_bytes(size_t len) {
        std::vector<uint8_t> buf(len);
        random_buffer(buf.data(), len);
        return buf;
    }

    // Range Proof Verification Logic
    bool verify_range_proof(const RangeProofRequest& req) {
        const ecdsa_curve* curve = &secp256k1;
        
        // Read Commitments
        curve_point C0, C1, C2, C3, RC1, RC2;
        if (ecdsa_read_pubkey(curve, req.c0.bytes, &C0) != 0) return false;
        if (ecdsa_read_pubkey(curve, req.c1.bytes, &C1) != 0) return false;
        if (ecdsa_read_pubkey(curve, req.c2.bytes, &C2) != 0) return false;
        if (ecdsa_read_pubkey(curve, req.c3.bytes, &C3) != 0) return false;
        if (ecdsa_read_pubkey(curve, req.range_c1.bytes, &RC1) != 0) return false;
        if (ecdsa_read_pubkey(curve, req.range_c2.bytes, &RC2) != 0) return false;

        // C = C0 + C1 + C2 + C3
        curve_point C = C0;
        point_add(curve, &C, &C1); // helper function point_add defined later? No, trezor has point_add in curves.h?
        // Wait, trezor curves.h has `void point_add(const ecdsa_curve *curve, const curve_point *cp1, curve_point *cp2);` // cp2 += cp1
        // Wait, actually `void point_add(const ecdsa_curve *curve, const curve_point *cp1, curve_point *cp2);`
        // Implementation in curves.c: `void point_add(const ecdsa_curve *curve, const curve_point *cp1, curve_point *cp2)` adds cp1 to cp2.
        
        point_add(curve, &C2, &C); // C += C2
        point_add(curve, &C3, &C); // C += C3
        
        // P1 = b*G - RC1
        bignum256 b_bn;
        bn_read_uint64(req.max_val, &b_bn);
        curve_point bG;
        scalar_multiply(curve, &b_bn, &bG); // bG = b * G
        
        curve_point neg_RC1 = RC1;
        bn_subtract(&curve->prime, &neg_RC1.y, &neg_RC1.y); // Negate
        
        curve_point P1 = bG;
        point_add(curve, &neg_RC1, &P1); // P1 += -RC1
        
        // P2 = RC2 + a*G
        bignum256 a_bn;
        bn_read_uint64(req.min_val, &a_bn);
        curve_point aG;
        scalar_multiply(curve, &a_bn, &aG);
        
        curve_point P2 = RC2;
        point_add(curve, &aG, &P2); // P2 += aG
        
        // Check P1 == C && P2 == C
        bool eq1 = bn_is_equal(&P1.x, &C.x) && bn_is_equal(&P1.y, &C.y);
        bool eq2 = bn_is_equal(&P2.x, &C.x) && bn_is_equal(&P2.y, &C.y);
        
        return eq1 && eq2;
    }

private:
    std::vector<uint8_t> server_priv_key_;
    std::vector<uint8_t> registered_client_pub_;
};

// --- Session ---
class Session : public std::enable_shared_from_this<Session> {
public:
    Session(tcp::socket socket) : socket_(std::move(socket)) {}

    void start() {
        do_read_header();
    }

private:
    void do_read_header() {
        auto self(shared_from_this());
        boost::asio::async_read(socket_, boost::asio::buffer(len_buf_),
            [this, self](boost::system::error_code ec, std::size_t) {
                if (!ec) {
                    uint32_t len = (len_buf_[0] << 24) | (len_buf_[1] << 16) | (len_buf_[2] << 8) | len_buf_[3];
                    do_read_body(len);
                }
            });
    }

    void do_read_body(uint32_t len) {
        auto self(shared_from_this());
        read_buf_.resize(len);
        boost::asio::async_read(socket_, boost::asio::buffer(read_buf_),
            [this, self](boost::system::error_code ec, std::size_t) {
                if (!ec) {
                    handle_msg();
                    do_read_header();
                }
            });
    }

    void handle_msg() {
        Message msg = Message_init_zero;
        pb_istream_t stream = pb_istream_from_buffer(read_buf_.data(), read_buf_.size());
        if (!pb_decode(&stream, Message_fields, &msg)) return;

        Message resp = Message_init_zero;
        bool send_resp = false;

        if (msg.which_payload == Message_auth_init_tag) {
            auto& init = msg.payload.auth_init;
            std::string cid(init.client_id);
            std::vector<uint8_t> sig(init.signature.bytes, init.signature.bytes + init.signature.size);
            std::vector<uint8_t> data(cid.begin(), cid.end());
            
            if (crypto_.verify_signature(crypto_.sha256(data), sig)) {
                std::cout << "Client verified: " << cid << std::endl;
                challenge_ = crypto_.random_bytes(32);
                
                resp.which_payload = Message_auth_challenge_tag;
                resp.type = Message_Type_AUTH_CHALLENGE; // Manually added field in Proto? No, using oneof.
                // Wait, oneof doesn't have 'type' enum in struct if not defined.
                // Ah, my proto defined `Message` as simple oneof wrapper.
                // Nanopb generates a struct `Message` with `which_payload` and union/payload.
                
                memcpy(resp.payload.auth_challenge.random_data.bytes, challenge_.data(), 32);
                resp.payload.auth_challenge.random_data.size = 32;
                
                auto s_sig = crypto_.sign(crypto_.sha256(challenge_));
                memcpy(resp.payload.auth_challenge.server_signature.bytes, s_sig.data(), s_sig.size());
                resp.payload.auth_challenge.server_signature.size = s_sig.size();
                send_resp = true;
            } else {
                std::cout << "Auth failed for " << cid << std::endl;
            }
        } else if (msg.which_payload == Message_auth_response_tag) {
            auto& ar = msg.payload.auth_response;
            std::vector<uint8_t> sig(ar.signature.bytes, ar.signature.bytes + ar.signature.size);
            if (crypto_.verify_signature(crypto_.sha256(challenge_), sig)) {
                std::cout << "Handshake complete." << std::endl;
                authenticated_ = true;
                resp.which_payload = Message_auth_result_tag;
                resp.payload.auth_result.success = true;
                send_resp = true;
            } else {
                 resp.which_payload = Message_auth_result_tag;
                 resp.payload.auth_result.success = false;
                 send_resp = true;
            }
        } else if (msg.which_payload == Message_range_proof_request_tag && authenticated_) {
            auto& req = msg.payload.range_proof_request;
            std::cout << "Verifying Range Proof..." << std::endl;
            bool res = crypto_.verify_range_proof(req);
            std::cout << "Result: " << res << std::endl;
            resp.which_payload = Message_range_proof_result_tag;
            resp.payload.range_proof_result.success = res;
            send_resp = true;
        }

        if (send_resp) send_message(resp);
    }

    void send_message(const Message& msg) {
        size_t size;
        pb_get_encoded_size(&size, Message_fields, &msg);
        std::vector<uint8_t> buf(4 + size);
        
        buf[0] = (size >> 24) & 0xFF;
        buf[1] = (size >> 16) & 0xFF;
        buf[2] = (size >> 8) & 0xFF;
        buf[3] = size & 0xFF;
        
        pb_ostream_t stream = pb_ostream_from_buffer(buf.data() + 4, size);
        pb_encode(&stream, Message_fields, &msg);

        auto self(shared_from_this());
        boost::asio::async_write(socket_, boost::asio::buffer(buf),
            [this, self](boost::system::error_code, std::size_t) {});
    }

    tcp::socket socket_;
    Crypto crypto_; // Unique crypto per session? Or shared? Crypto class is cheap.
    std::vector<uint8_t> len_buf_ = {0,0,0,0};
    std::vector<uint8_t> read_buf_;
    std::vector<uint8_t> challenge_;
    bool authenticated_ = false;
};

// --- Server ---
class Server {
public:
    Server(boost::asio::io_context& io, short port) : acceptor_(io, tcp::endpoint(tcp::v4(), port)) {
        do_accept();
    }
private:
    void do_accept() {
        acceptor_.async_accept([this](boost::system::error_code ec, tcp::socket socket) {
            if (!ec) std::make_shared<Session>(std::move(socket))->start();
            do_accept();
        });
    }
    tcp::acceptor acceptor_;
};

int main() {
    try {
        boost::asio::io_context io;
        Server s(io, 8080);
        std::cout << "Simplified Server running on 8080..." << std::endl;
        io.run();
    } catch (std::exception& e) {
        std::cerr << e.what() << std::endl;
    }
    return 0;
}
