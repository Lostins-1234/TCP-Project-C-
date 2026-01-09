# Secure Range Proof System

A secure client-server system implementing Range Proof protocols using Boost Asio, Trezor Crypto, and Nanopb.

## Project Structure
- `server/`: C++ Server implementation.
    - `src/`: Source files (`Server.cpp`, `CryptoHandler.cpp`, `main.cpp`).
    - `include/`: Headers (`Server.hpp`, `CryptoHandler.hpp` and generated PB headers).
- `client/`: Node.js/TypeScript Client implementation.
    - `src/`: Client sources (`client.ts`, `crypto_utils.ts`, `four_squares.ts`).
- `proto/`: Protocol Buffer definitions (`protocol.proto`, `protocol.options`).
- `deps/`: Dependencies (`nanopb`, `trezor-crypto`).

## Prerequisities
- **C++ Server**:
    - CMake (3.10+)
    - C++ Compiler (GCC/Clang/MSVC) supporting C++17.
    - Boost Libraries (specifically `Boost.Asio` and `Boost.System`).
    - Python (for Nanopb generator).
- **Client**:
    - Node.js (v16+)
    - npm

## Build Instructions

### Server
1. Navigate to the project root.
2. Create a build directory:
   ```bash
   mkdir server/build
   cd server/build
   ```
3. Configure CMake:
   ```bash
   cmake ../.. -S ../
   ```
   *Note: Ensure Boost is reachable. You may need `-DBOOST_ROOT=/path/to/boost`.*
4. Build:
   ```bash
   cmake --build .
   ```
   The executable `server` (or `server.exe`) will be created.

### Client
1. Navigate to `client/`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build TypeScript:
   ```bash
   npm run build
   ```

## Running the System

1. **Start Server**:
   ```bash
   ./server/build/server
   ```
   Server listens on port 8080.

2. **Start Client**:
   ```bash
   cd client
   npm start
   ```
   Client will connect, authenticate, and perform the Range Proof protocol.
