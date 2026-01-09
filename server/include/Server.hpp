#pragma once

#include <boost/asio.hpp>
#include <string>
#include <vector>
#include <memory>
#include <iostream>

#include "protocol.pb.h"
#include "CryptoHandler.hpp"

using boost::asio::ip::tcp;

class Server {
public:
    Server(boost::asio::io_context& io_context, short port);

private:
    void do_accept();

    boost::asio::io_context& io_context_;
    tcp::acceptor acceptor_;
    CryptoHandler crypto_handler_;
};

class Session : public std::enable_shared_from_this<Session> {
public:
    Session(tcp::socket socket, CryptoHandler& crypto_handler);
    void start();

private:
    void do_read_header();
    void do_read_body(uint32_t length);
    void handle_message(const std::vector<uint8_t>& data);
    void send_message(const Message& msg);

    // Handlers for specific message types
    void handle_auth_init(const AuthInit& auth_init);
    void handle_auth_response(const AuthResponse& auth_response);
    void handle_range_proof_request(const RangeProofRequest& req);

    tcp::socket socket_;
    CryptoHandler& crypto_handler_;
    std::vector<uint8_t> read_buffer_;
    
    // Auth State
    bool authenticated_ = false;
    std::string client_serial_id_;
    std::vector<uint8_t> current_challenge_;
};
