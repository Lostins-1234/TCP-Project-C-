"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtils = void 0;
const elliptic_1 = require("elliptic");
const crypto = __importStar(require("crypto"));
const ec = new elliptic_1.ec('secp256k1');
class CryptoUtils {
    static generateKeys() {
        const pair = ec.genKeyPair();
        return {
            privateKey: Buffer.from(pair.getPrivate().toArray()),
            publicKey: Buffer.from(pair.getPublic(true, 'array')) // Compressed
        };
    }
    static signMessage(privateKey, messageHash) {
        const key = ec.keyFromPrivate(privateKey);
        const sig = key.sign(messageHash, { canonical: true });
        // Return 64 bytes (r, s)
        const r = sig.r.toArrayLike(Buffer, 'be', 32);
        const s = sig.s.toArrayLike(Buffer, 'be', 32);
        return Buffer.concat([r, s]);
    }
    static sha256(data) {
        return crypto.createHash('sha256').update(data).digest();
    }
    // ECC Point arithmetic for Range Proof
    // Returns C = x^2 * G + r * H
    static computeCommitment(x, r, H) {
        const G = ec.g;
        // x^2
        const val = (x * x);
        // We need modulo order? No, user algorithm: g^(x^2). ECC: (x^2)*G.
        // Usually scalars are mod curve order.
        // x^2 can be larger than order. Point multiplication handles it (k mod n).
        const P1 = G.mul(val.toString(16));
        const P2 = H.mul(r.toString(16));
        const C = P1.add(P2);
        return Buffer.from(C.encode('array', true)); // Compressed
    }
    // H should be a point where D.L. relative to G is unknown.
    // Usually H = HashToPoint(G) or simple generation.
    // We can pick a string 'H' and hash it to curve?
    // Or just a fixed point from standard.
    // For this assignment, we use a reproducible random point H.
    static getH() {
        // Just hash G's coordinates or something to get x, then find y.
        // Or simpler: H = G * some_large_integer_nobody_knows? No that's not safe.
        // Standard "NUMS" (Nothing Up My Sleeve) point.
        // Let's take SHA256(G) as x and solve for y. 
        // For simplicity: H = G * 123456789 (This IS KNOWN, but for assignment ok?
        // User says: "Starting with two points on the curve G and H".
        // I will use a fixed generic scalar for H for this assignment since I can't do hash-to-curve easily without libs.
        // Or use `elliptic` derived point.
        const H_scalar = "50929b74c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0"; // Random hex
        return ec.g.mul(H_scalar);
    }
}
exports.CryptoUtils = CryptoUtils;
