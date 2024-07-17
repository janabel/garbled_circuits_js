/**
 * trying to write own elgamal...bc imports aren't working
 */

const { randomBytes } = require("ethers");

function modExp(g, x, p) {
  if (x == 0) {
    return 1;
  } else if (x % 2 == 1) {
    return g * modExp(g, x - 1, p);
  } else {
    return modExp(g, int(x / 2), p) ** 2;
  }
}

let g = 2; // Example hardcoded generator
// let p = 273642631234267659578614283404793032137; // Example hardcoded prime field
let p = 1048573;

// Function to calculate public key y from private key x
function calculatePublicKey(x) {
  // x = BigInt(x);
  console.log(x);

  // Compute y = g^x % p using modular exponentiation
  let y = modExp(g, x, p);

  return y;
}

function ElGamal(priv_key, public_key) {
  this.priv_key = priv_key;
  this.public_key = public_key;
}

//  privkey = x
//  publickey = g^x
//  encryption of m = (g^xr * m, g^r), where r is random
