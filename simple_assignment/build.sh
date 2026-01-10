#!/bin/bash

# Define paths
NANOPB="../deps/nanopb"
TREZOR="../deps/trezor-crypto"

# Generate Proto implementation
python3 ../deps/nanopb/generator/nanopb_generator.py protocol.proto

# Compile Server
g++ -std=c++17 \
    -I. -I$NANOPB -I$TREZOR \
    server.cpp protocol.pb.c \
    $NANOPB/pb_encode.c $NANOPB/pb_decode.c $NANOPB/pb_common.c \
    $TREZOR/secp256k1.c $TREZOR/ecdsa.c $TREZOR/rand.c $TREZOR/sha2.c $TREZOR/bignum.c $TREZOR/hmac.c $TREZOR/ripemd160.c $TREZOR/memzero.c $TREZOR/curves.c \
    -lssl -lcrypto -lpthread \
    -o server

echo "Build complete."
