#include <iostream>
#include <boost/asio.hpp>
#include "Server.hpp"

int main() {
    try {
        boost::asio::io_context io_context;
        Server server(io_context, 8080);
        
        // Register client123 with the public key corresponding to privKey 111...111
        // PubKey (compressed) for 111...111 is: 034f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa
        std::vector<uint8_t> client_pub = {
            0x03, 0x4f, 0x35, 0x5b, 0xdc, 0xb7, 0xcc, 0x0a, 0xf7, 0x28, 0xef, 0x3c, 0xce, 0xb9, 0x61, 0x5d,
            0x90, 0x68, 0x4b, 0xb5, 0xb2, 0xca, 0x5f, 0x85, 0x9a, 0xb0, 0xf0, 0xb7, 0x04, 0x07, 0x58, 0x71, 0xaa
        };
        server.get_crypto_handler()->add_client_key("client123", client_pub);

        std::cout << "Server starting on port 8080..." << std::endl;
        io_context.run();
    } catch (std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }
    return 0;
}
