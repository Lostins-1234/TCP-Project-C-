#pragma once

#include <vector>
#include <string>
#include <cstdint>
#include "protocol.pb.h"

// Trezor Crypto headers
extern "C" {
#include "ecdsa.h"
#include "secp256k1.h"
#include "rand.h"
}

struct Point {
    std::vector<uint8_t> data; // Compressed 33 bytes or Uncompressed 65 bytes
};

class CryptoHandler {
public:
    CryptoHandler();
    ~CryptoHandler();

    // Key Management
    void set_server_keys(const std::vector<uint8_t>& priv_key);
    void add_client_key(const std::string& serial_id, const std::vector<uint8_t>& pub_key);
    
    // Auth
    bool verify_client_signature(const std::string& serial_id, const std::vector<uint8_t>& msg_hash, const std::vector<uint8_t>& signature);
    std::vector<uint8_t> sign_message(const std::vector<uint8_t>& msg_hash);
    std::vector<uint8_t> get_random_bytes(size_t len);
    std::vector<uint8_t> sha256(const std::vector<uint8_t>& data);

    // Range Proof
    // Verifies that the commitment C (sum of c0..c3) corresponds to a value in [min, max]
    // given the proof commitments range_c1 and range_c2.
    // Also checks p1 == p2 == C.
    bool verify_range_proof(uint64_t min_val, uint64_t max_val, 
                            const std::vector<uint8_t>& c0,
                            const std::vector<uint8_t>& c1,
                            const std::vector<uint8_t>& c2,
                            const std::vector<uint8_t>& c3,
                            const std::vector<uint8_t>& range_c1,
                            const std::vector<uint8_t>& range_c2);

private:
    std::vector<uint8_t> server_priv_key_;
    // Map serial_id -> pub_key
    // For simplicity using a vector of pairs or looking up hardcoded
    struct ClientInfo {
        std::string serial_id;
        std::vector<uint8_t> pub_key;
    };
    std::vector<ClientInfo> clients_;
};
