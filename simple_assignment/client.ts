import * as net from 'net';
import * as path from 'path';
import * as protobuf from 'protobufjs';
import * as crypto from 'crypto';
import { ec as EC } from 'elliptic';

// --- Configuration ---
const HOST = '127.0.0.1';
const PORT = 8080;
const CLIENT_ID = "client123";
// Fixed Private Key (matches server's registered public key)
const PRIV_KEY_HEX = "1111111111111111111111111111111111111111111111111111111111111111";
const MIN_VAL = 0n;
const MAX_VAL = 1000000n;
const SECRET_VAL = 12345n;

// --- Crypto Setup ---
const ec = new EC('secp256k1');
const keyPair = ec.keyFromPrivate(PRIV_KEY_HEX);
const privKeyBuf = Buffer.from(keyPair.getPrivate().toArrayLike(Buffer, 'be', 32));

// Helper: H Point (random but fixed for this assignment)
const H_SCALAR = "50929b74c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0";
const H = ec.g.mul(H_SCALAR);

function sign(msgHash: Buffer): Buffer {
    const sig = keyPair.sign(msgHash, { canonical: true });
    return Buffer.concat([
        sig.r.toArrayLike(Buffer, 'be', 32),
        sig.s.toArrayLike(Buffer, 'be', 32)
    ]);
}

function sha256(data: Buffer): Buffer {
    return crypto.createHash('sha256').update(data).digest();
}

// Range Proof: Decompose into 4 squares: val = x0^2 + x1^2 + x2^2 + x3^2
function fourSquares(n: bigint): bigint[] {
    // Simplified: Use brute force for small numbers or specific algorithm?
    // Project requirement mentions "Lagrange's four-square theorem".
    // For small numbers, simple backtracking works fast enough.
    // n is around 10^6 max for this test? Or 2^64?
    // 12345 is small. 
    // Optimization: find a such that n - a^2 > 0...
    let val = Number(n);
    // JS Number is safe integer up to 2^53. 1000000 is fine.

    for (let a = Math.floor(Math.sqrt(val)); a >= 0; a--) {
        let rem1 = val - a * a;
        for (let b = Math.floor(Math.sqrt(rem1)); b >= 0; b--) {
            let rem2 = rem1 - b * b;
            for (let c = Math.floor(Math.sqrt(rem2)); c >= 0; c--) {
                let d = Math.sqrt(rem2 - c * c);
                if (Number.isInteger(d)) {
                    return [BigInt(a), BigInt(b), BigInt(c), BigInt(d)];
                }
            }
        }
    }
    throw new Error("4-square decomp failed (should never happen)");
}

function computeCommitment(x: bigint, r: bigint): Buffer {
    const G = ec.g;
    // C = (x^2)*G + r*H
    const x2 = (x * x);
    const P1 = G.mul(x2.toString(16));
    const P2 = H.mul(r.toString(16));
    const C = P1.add(P2);
    return Buffer.from(C.encode('array', true));
}


// --- Main ---

async function main() {
    console.log("Loading Proto...");
    const root = await protobuf.load(path.join(__dirname, 'protocol.proto'));
    const Message = root.lookupType("Message");

    const socket = new net.Socket();
    let buffer = Buffer.alloc(0);

    socket.connect(PORT, HOST, () => {
        console.log(`Connected to ${HOST}:${PORT}`);

        // 1. Send AuthInit
        const hash = sha256(Buffer.from(CLIENT_ID));
        const sig = sign(hash);

        const msg = {
            authInit: {
                clientId: CLIENT_ID,
                signature: sig
            }
        };
        send(msg);
    });

    socket.on('data', (data) => {
        buffer = Buffer.concat([buffer, data]);
        while (true) {
            if (buffer.length < 4) return;
            const len = buffer.readUInt32BE(0);
            if (buffer.length < 4 + len) return;

            const payload = buffer.slice(4, 4 + len);
            buffer = buffer.slice(4 + len);

            const msg = Message.decode(payload) as any;
            handleMessage(msg);
        }
    });

    function send(payload: any) {
        const err = Message.verify(payload);
        if (err) throw Error(err);
        const buf = Message.encode(payload).finish();
        const lenBuf = Buffer.alloc(4);
        lenBuf.writeUInt32BE(buf.length, 0);
        socket.write(Buffer.concat([lenBuf, buf]));
    }

    function handleMessage(msg: any) {
        if (msg.authChallenge) {
            console.log("Received Auth Challenge");
            const chal = msg.authChallenge;
            // Verify server signature? Skipped for simplicity in monolithic.
            const rnd = chal.randomData;
            const sig = sign(sha256(rnd));
            send({ authResponse: { signature: sig } });
        }
        else if (msg.authResult) {
            if (msg.authResult.success) {
                console.log("Auth Success! Sending Range Proof...");
                sendRangeProof();
            } else {
                console.error("Auth Failed");
                socket.end();
            }
        }
        else if (msg.rangeProofResult) {
            console.log("Range Proof Result:", msg.rangeProofResult.success);
            socket.end();
        }
    }

    function sendRangeProof() {
        const squares = fourSquares(SECRET_VAL);
        console.log(`Decomposed ${SECRET_VAL} into:`, squares);

        // Random R's
        const r0 = BigInt("0x" + crypto.randomBytes(32).toString('hex')) % BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
        const r1 = BigInt("0x" + crypto.randomBytes(32).toString('hex')) % BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
        const r2 = BigInt("0x" + crypto.randomBytes(32).toString('hex')) % BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
        const r3 = BigInt("0x" + crypto.randomBytes(32).toString('hex')) % BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

        // r = r0+r1+r2+r3
        const r = (r0 + r1 + r2 + r3) % BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

        const c0 = computeCommitment(squares[0], r0);
        const c1 = computeCommitment(squares[1], r1);
        const c2 = computeCommitment(squares[2], r2);
        const c3 = computeCommitment(squares[3], r3);

        const G = ec.g;

        // rc1 = (b-x)G - rH
        const b = MAX_VAL;
        const x = SECRET_VAL;

        const b_x = G.mul((b - x).toString(16));
        const rH = H.mul(r.toString(16));
        const rc1_pt = b_x.add(rH.neg());

        // rc2 = (x-a)G + rH
        const a = MIN_VAL;
        const x_a = G.mul((x - a).toString(16));
        const rc2_pt = x_a.add(rH);

        send({
            rangeProofRequest: {
                minVal: MIN_VAL.toString(),
                maxVal: MAX_VAL.toString(),
                c0: c0, c1: c1, c2: c2, c3: c3,
                rangeC1: Buffer.from(rc1_pt.encode('array', true)),
                rangeC2: Buffer.from(rc2_pt.encode('array', true))
            }
        });
    }
}

main();
