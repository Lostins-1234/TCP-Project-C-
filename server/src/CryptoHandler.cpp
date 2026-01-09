#include "CryptoHandler.hpp"
#include <iostream>
#include <cstring>
#include <stdexcept>
#include <numeric>

extern "C" {
#include "sha2.h"
#include "curves.h"
}

CryptoHandler::CryptoHandler() {
    // Initialize server keys (example: hardcoded or generated)
    // For this assignment, we'll set them manually or generate random
    server_priv_key_.resize(32);
    random_buffer(server_priv_key_.data(), 32);
}

CryptoHandler::~CryptoHandler() {}

void CryptoHandler::set_server_keys(const std::vector<uint8_t>& priv_key) {
    server_priv_key_ = priv_key;
}

void CryptoHandler::add_client_key(const std::string& serial_id, const std::vector<uint8_t>& pub_key) {
    clients_.push_back({serial_id, pub_key});
}

std::vector<uint8_t> CryptoHandler::sha256(const std::vector<uint8_t>& data) {
    std::vector<uint8_t> hash(SHA256_DIGEST_LENGTH);
    sha256_Raw(data.data(), data.size(), hash.data());
    return hash;
}

bool CryptoHandler::verify_client_signature(const std::string& serial_id, const std::vector<uint8_t>& msg_hash, const std::vector<uint8_t>& signature) {
    // Find client key
    const std::vector<uint8_t>* client_pub = nullptr;
    for (const auto& c : clients_) {
        if (c.serial_id == serial_id) {
            client_pub = &c.pub_key;
            break;
        }
    }
    
    if (!client_pub) {
        // For testing purposes, if no client found, we might want to accept everything or fail.
        // Failing is safer.
        // However, I'll allow a specific "test_client" or fail.
        std::cerr << "Client ID not found: " << serial_id << std::endl;
        return false;
    }

    // Trezor ecdsa_verify
    // signature is 64 bytes (r, s)? Or specific format?
    // Client usually sends 64 bytes.
    // curve: secp256k1
    const curve_info* curve = &secp256k1_info;
    return ecdsa_verify_digest(curve, client_pub->data(), signature.data(), msg_hash.data()) == 0;
}

std::vector<uint8_t> CryptoHandler::sign_message(const std::vector<uint8_t>& msg_hash) {
    std::vector<uint8_t> signature(64);
    const curve_info* curve = &secp256k1_info;
    // ecdsa_sign_digest(const curve_info *curve, const uint8_t *priv_key, const uint8_t *digest, uint8_t *sig, uint8_t *pby, int (*is_canonical)(uint8_t by, uint8_t sig[64]))
    uint8_t pby;
    ecdsa_sign_digest(curve, server_priv_key_.data(), msg_hash.data(), signature.data(), &pby, nullptr);
    return signature;
}

std::vector<uint8_t> CryptoHandler::get_random_bytes(size_t len) {
    std::vector<uint8_t> buf(len);
    random_buffer(buf.data(), len);
    return buf;
}

// Helper to add points: R = P + Q
bool point_add(const curve_info* curve, const std::vector<uint8_t>& P_bytes, const std::vector<uint8_t>& Q_bytes, std::vector<uint8_t>& R_bytes) {
    curve_point P, Q, R;
    // Uncompress/Read P
    // For simplicity, assuming uncompressed (65 bytes) or compressed (33 bytes) is handled by built-in ecdsa functions?
    // Trezor crypto `point_read_network` or similar?
    // Looking at curves.h or ecdsa.h.
    // `ecdsa_read_pubkey` reads 33 or 65 bytes.
    if (ecdsa_read_pubkey(curve, P_bytes.data(), &P) != 0) return false;
    if (ecdsa_read_pubkey(curve, Q_bytes.data(), &Q) != 0) return false;

    point_add(curve, &P, &Q);
    
    // Write back R
    R_bytes.resize(33);
    // point_write_network? No, usually separate.
    // Use `point_compress`? 
    // Usually `bn_write_be(P.x, ...)`
    // Trezor internal functions for point serialization might be private.
    // We can use public API `ecdsa_uncompress_pubkey` to get raw x,y but we want to store it.
    // Let's use 65 bytes output uncompressed.
    // Actually `pk_write` or similar?
    // Let's check Trezor API again. 
    // It has `point_multiply` but simple point addition might be `point_add` in `curves.c` but it's internal?
    // It is in `curves.h`?
    // `void point_add(const curve_info *curve, curve_point *cp1, const curve_point *cp2);` // cp1 += cp2
    
    R_bytes.resize(65);
    R_bytes[0] = 0x04;
    bn_write_be(&P.x, R_bytes.data() + 1);
    bn_write_be(&P.y, R_bytes.data() + 33);
    return true;
}

// Helper to scalar mul: R = k * G
std::vector<uint8_t> scalar_mul_G(uint64_t val) {
    const curve_info* curve = &secp256k1_info;
    curve_point R;
    bignum256 k;
    bn_read_uint64(val, &k);
    
    scalar_multiply(curve, &k, &R); // R = k * G (using G generator)
    
    std::vector<uint8_t> ret(65);
    ret[0] = 0x04;
    bn_write_be(&R.x, ret.data()+1);
    bn_write_be(&R.y, ret.data()+33);
    return ret;
}

// Helper: R = k * P
// To mul by point, we need `point_multiply(curve, k, P, R)`
// `void point_multiply(const curve_info *curve, const bignum256 *k, const curve_point *p, curve_point *res);`

bool CryptoHandler::verify_range_proof(uint64_t min_val, uint64_t max_val, 
                        const std::vector<uint8_t>& c0,
                        const std::vector<uint8_t>& c1,
                        const std::vector<uint8_t>& c2,
                        const std::vector<uint8_t>& c3,
                        const std::vector<uint8_t>& range_c1,
                        const std::vector<uint8_t>& range_c2) 
{
    const curve_info* curve = &secp256k1_info;
    curve_point C0_p, C1_p, C2_p, C3_p, RC1_p, RC2_p;
    
    if (ecdsa_read_pubkey(curve, c0.data(), &C0_p) != 0) return false;
    if (ecdsa_read_pubkey(curve, c1.data(), &C1_p) != 0) return false;
    if (ecdsa_read_pubkey(curve, c2.data(), &C2_p) != 0) return false;
    if (ecdsa_read_pubkey(curve, c3.data(), &C3_p) != 0) return false;
    if (ecdsa_read_pubkey(curve, range_c1.data(), &RC1_p) != 0) return false;
    if (ecdsa_read_pubkey(curve, range_c2.data(), &RC2_p) != 0) return false;

    // 1. Compute C = C0 + C1 + C2 + C3
    curve_point C = C0_p;
    point_add(curve, &C, &C1_p);
    point_add(curve, &C, &C2_p);
    point_add(curve, &C, &C3_p);
    
    // 2. Compute P1 = b*G - range_c1
    // P1 = b*G - RC1 <=> P1 = b*G + (-RC1). 
    // Point negation: (x, -y mod p).
    // Trezor doesn't export point negation easily except manually modifying y.
    // Or we assume client sends ready RC1.
    // b*G
    bignum256 b_bn;
    bn_read_uint64(max_val, &b_bn);
    curve_point bG;
    scalar_multiply(curve, &b_bn, &bG);
    
    // -RC1
    curve_point neg_RC1 = RC1_p;
    bn_subtract(&curve->prime, &neg_RC1.y, &neg_RC1.y); // y = p - y
    
    curve_point P1 = bG;
    point_add(curve, &P1, &neg_RC1);
    
    // 3. Compute P2 = range_c2 + a*G
    bignum256 a_bn;
    bn_read_uint64(min_val, &a_bn);
    curve_point aG;
    scalar_multiply(curve, &a_bn, &aG);
    
    curve_point P2 = RC2_p;
    point_add(curve, &P2, &aG);
    
    // 4. Verify P1 == P2 == C
    // Check P1 == C
    if (!bn_is_equal(&P1.x, &C.x) || !bn_is_equal(&P1.y, &C.y)) return false;
    
    // Check P2 == C
    if (!bn_is_equal(&P2.x, &C.x) || !bn_is_equal(&P2.y, &C.y)) return false;
    
    return true;
}
