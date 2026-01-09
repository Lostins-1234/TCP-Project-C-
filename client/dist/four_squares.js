"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeFourSquares = decomposeFourSquares;
/**
 * Decomposes a number `val` into sum of 4 squares: val = a^2 + b^2 + c^2 + d^2.
 * Uses a backtracking approach which is efficient enough for typical ranges.
 */
function decomposeFourSquares(val) {
    if (val < 0n)
        throw new Error("Negative value");
    if (val === 0n)
        return [0n, 0n, 0n, 0n];
    const result = findSquares(val, 4);
    if (!result)
        throw new Error("Could not decompose");
    // Pad with zeros if less than 4 found (recursion returns just the squares found)
    while (result.length < 4) {
        result.push(0n);
    }
    return result;
}
function findSquares(target, depth) {
    if (depth === 1) {
        const root = sqrtBigInt(target);
        if (root * root === target) {
            return [root];
        }
        return null;
    }
    let root = sqrtBigInt(target);
    // Iterate downwards from root to 0
    // Heuristic: solutions are usually found with large components near sqrt.
    // Safety break?
    for (let i = root; i >= 0n; i--) {
        const sq = i * i;
        const remainder = target - sq;
        const res = findSquares(remainder, depth - 1);
        if (res) {
            return [i, ...res];
        }
    }
    return null;
}
function sqrtBigInt(value) {
    if (value < 0n)
        throw new Error("negative number is not supported");
    if (value < 2n)
        return value;
    let x0 = value;
    let x1 = (x0 + (value / x0)) >> 1n;
    while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + (value / x0)) >> 1n;
    }
    return x0;
}
