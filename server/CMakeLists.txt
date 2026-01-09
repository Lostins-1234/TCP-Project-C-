cmake_minimum_required(VERSION 3.10)
project(secure_range_proof_server)

set(CMAKE_CXX_STANDARD 17)

# Include Directories
include_directories(
    include
    ../deps/nanopb
    ../deps/trezor-crypto
)

# Nanopb Sources
set(NANOPB_SOURCES
    ../deps/nanopb/pb_common.c
    ../deps/nanopb/pb_encode.c
    ../deps/nanopb/pb_decode.c
)

# Trezor Crypto Sources
file(GLOB TREZOR_SOURCES
    ../deps/trezor-crypto/*.c
)
# Exclude tests and tools from Trezor sources
list(FILTER TREZOR_SOURCES EXCLUDE REGEX ".*tests/.*")
list(FILTER TREZOR_SOURCES EXCLUDE REGEX ".*tools/.*")
# We might need to be specific if glob picks up too much (conflicting main, etc)
# But trezor-crypto root .c files are mostly library code.
# One issue: `trezor-crypto` defines some symbols that might conflict if not careful, but usually it's fine.

# Server Sources
set(SERVER_SOURCES
    src/main.cpp
    src/Server.cpp
    src/CryptoHandler.cpp
    server/include/protocol.pb.c
)

# Find Boost
find_package(Boost REQUIRED COMPONENTS system)

# Add Executable
add_executable(server
    ${SERVER_SOURCES}
    ${NANOPB_SOURCES}
    ${TREZOR_SOURCES}
)

# Link Libraries
if(WIN32)
    target_link_libraries(server Boost::system ws2_32)
else()
    target_link_libraries(server Boost::system pthread)
endif()
