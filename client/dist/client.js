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
const net = __importStar(require("net"));
const path = __importStar(require("path"));
const protobuf = __importStar(require("protobufjs"));
const crypto_utils_1 = require("./crypto_utils");
const four_squares_1 = require("./four_squares");
const elliptic_1 = require("elliptic");
// Load Proto
const root = protobuf.loadSync(path.join(__dirname, '../../proto/protocol.proto'));
const Message = root.lookupType("Message");
// Configuration
const HOST = '127.0.0.1';
const PORT = 8080;
const SERIAL_ID = "client123";
const RANGE_BITS = 32;
const MIN_VAL = 0n;
const MAX_VAL = (1n << BigInt(RANGE_BITS)) - 1n;
const clientKeys = crypto_utils_1.CryptoUtils.generateKeys();
console.log("Client Public Key (hex):", clientKeys.publicKey.toString('hex'));
const socket = new net.Socket();
let isAuthenticated = false;
socket.connect(PORT, HOST, () => {
    console.log(`Connected to server ${HOST}:${PORT}`);
    startAuth();
});
socket.on('data', (data) => {
    handleData(data);
});
socket.on('close', () => {
    console.log('Connection closed');
});
let buffer = Buffer.alloc(0);
function handleData(data) {
    buffer = Buffer.concat([buffer, data]);
    while (true) {
        if (buffer.length < 4)
            return;
        const len = buffer.readUInt32BE(0);
        if (buffer.length < 4 + len)
            return;
        const msgBytes = buffer.slice(4, 4 + len);
        buffer = buffer.slice(4 + len);
        const msg = Message.decode(msgBytes);
        processMessage(msg);
    }
}
function sendMessage(msg) {
    const err = Message.verify(msg);
    if (err)
        throw Error(err);
    const buffer = Message.encode(msg).finish();
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(buffer.length, 0);
    socket.write(Buffer.concat([lenBuf, buffer]));
}
function startAuth() {
    console.log("Starting Auth...");
    const hash = crypto_utils_1.CryptoUtils.sha256(Buffer.from(SERIAL_ID));
    const sig = crypto_utils_1.CryptoUtils.signMessage(clientKeys.privateKey, hash);
    const msg = {
        type: 0, // AUTH_INIT
        authInit: {
            serialId: SERIAL_ID,
            signature: sig
        }
    };
    sendMessage(msg);
}
function processMessage(msg) {
    switch (msg.type) {
        case 1: // AUTH_CHALLENGE
            handleAuthChallenge(msg.authChallenge);
            break;
        case 3: // AUTH_RESULT
            handleAuthResult(msg.authResult);
            break;
        case 5: // RANGE_PROOF_RESULT
            handleRangeProofResult(msg.rangeProofResult);
            break;
        default:
            console.log("Unknown message type:", msg.type);
    }
}
function handleAuthChallenge(challenge) {
    console.log("Received Challenge.");
    // Verify server signature? 
    // Ideally yes, using server pubkey. For assignment we assume trust or pre-shared.
    // Client signs the random number.
    const rnd = challenge.randomNumber; // Buffer
    // Hash it? "Server verifies signature using hash to the random number"
    const hash = crypto_utils_1.CryptoUtils.sha256(rnd);
    const sig = crypto_utils_1.CryptoUtils.signMessage(clientKeys.privateKey, hash);
    const msg = {
        type: 2, // AUTH_RESPONSE
        authResponse: {
            signature: sig
        }
    };
    sendMessage(msg);
}
function handleAuthResult(result) {
    if (result.success) {
        console.log("Authentication Successful.");
        isAuthenticated = true;
        sendRangeProof();
    }
    else {
        console.log("Authentication Failed.");
        socket.destroy();
    }
}
function sendRangeProof() {
    const secretV = 12345n; // Value to prove
    console.log(`Generating Range Proof for value: ${secretV} in range [${MIN_VAL}, ${MAX_VAL}]`);
    // 1. Decompose into 4 squares: x = x0^2 + x1^2 + x2^2 + x3^2
    const squares = (0, four_squares_1.decomposeFourSquares)(secretV);
    // squares are x_i (roots).
    // Algorithm says: c_i = g^(x_i^2) * h^ri (in modular) -> C_i = (x_i^2)*G + r_i*H (in ECC)
    const ec = new elliptic_1.ec('secp256k1');
    const H = crypto_utils_1.CryptoUtils.getH();
    // Use any cast to avoid TS conflicting with Web Crypto global type
    const _crypto = crypto;
    const r0 = BigInt("0x" + _crypto.randomBytes(32).toString('hex')); // Random r_i
    const r1 = BigInt("0x" + _crypto.randomBytes(32).toString('hex'));
    const r2 = BigInt("0x" + _crypto.randomBytes(32).toString('hex'));
    const r3 = BigInt("0x" + _crypto.randomBytes(32).toString('hex'));
    const c0 = crypto_utils_1.CryptoUtils.computeCommitment(squares[0], r0, H);
    const c1 = crypto_utils_1.CryptoUtils.computeCommitment(squares[1], r1, H);
    const c2 = crypto_utils_1.CryptoUtils.computeCommitment(squares[2], r2, H);
    const c3 = crypto_utils_1.CryptoUtils.computeCommitment(squares[3], r3, H);
    // Total r
    // r = r0+r1+r2+r3
    // ECC scalars are mod Curve Order.
    const n_curve = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"); // secp256k1 order
    const r = (r0 + r1 + r2 + r3) % n_curve;
    // Proof Commitments
    // c1_proof = (b - x)G - rH
    // c2_proof = (x - a)G + rH
    // x is secretV
    const b = MAX_VAL;
    const a = MIN_VAL;
    const x = secretV;
    const G = ec.g;
    // c1_proof computation
    // val1 = (b-x)
    const val1 = (b - x);
    // P_b_x = val1 * G
    const P_b_x = G.mul(val1.toString(16));
    // P_rH = r * H
    const P_rH = H.mul(r.toString(16));
    // c1 = P_b_x - P_rH = P_b_x + (-P_rH)
    // To neg, point.neg().
    const c1_proof = P_b_x.add(P_rH.neg());
    // c2_proof = (x-a)G + rH
    const val2 = (x - a);
    const P_x_a = G.mul(val2.toString(16));
    const c2_proof = P_x_a.add(P_rH);
    const msg = {
        type: 4, // RANGE_PROOF_REQUEST
        rangeProofRequest: {
            minValue: MIN_VAL.toString(), // uint64 in proto, JS uses string/number. protobufjs handles long as Long or number.
            maxValue: MAX_VAL.toString(),
            bitLength: RANGE_BITS,
            c0: c0,
            c1: c1,
            c2: c2,
            c3: c3,
            rangeC1: Buffer.from(c1_proof.encode('array', true)),
            rangeC2: Buffer.from(c2_proof.encode('array', true))
        }
    };
    sendMessage(msg);
}
function handleRangeProofResult(result) {
    if (result.success) {
        console.log("Range Proof Verified Successfully!");
    }
    else {
        console.log("Range Proof Verification FAILED.");
    }
    socket.end();
}
