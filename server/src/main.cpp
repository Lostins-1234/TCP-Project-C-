#include <iostream>
#include <boost/asio.hpp>
#include "Server.hpp"

int main() {
    try {
        boost::asio::io_context io_context;
        Server server(io_context, 8080);
        std::cout << "Server starting on port 8080..." << std::endl;
        io_context.run();
    } catch (std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }
    return 0;
}
