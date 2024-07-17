import { mode } from "../webpack.config.cjs";

document
  .getElementById("key-gen-button")
  .addEventListener("click", function () {
    const priv_key = document.getElementById("priv-key").value;
    console.log(priv_key);

    console.log("generating keypair...");
    const public_key = calculatePublicKey(priv_key);

    document.getElementById(
      "public-key"
    ).innerText = `Your public key is: ${public_key}`;
  });

/**
 * trying to write own elgamal...bc imports aren't working
 */

// const { randomBytes } = require("ethers");

function modExp(g, x, p) {
  if (x == 0) {
    return 1;
  } else if (x % 2 == 1) {
    return (g * modExp(g, x - 1, p)) % p;
  } else {
    return modExp(g, Math.floor(x / 2), p) ** 2 % p;
  }
}

let g = 2; // Example hardcoded generator
let p = 12723196397701668208700104503478505500464996128258107249873600831520292713; // Example hardcoded prime field

// Function to calculate public key y from private key x
function calculatePublicKey(priv_key) {
  // x = BigInt(x);
  console.log(priv_key);

  // Compute y = g^x % p using modular exponentiation
  let y = modExp(g, priv_key, p);

  return y;
}

// Function to generate random private key x and corresponding public key

function generateKeyPair() {
  const priv_key = Math.random(1, p - 1);
  const public_key = modExp(g, priv_key, p);

  return priv_key, public_key;
}

class ElGamal {
  constructor(priv_key, public_key, g, p) {
    this.priv_key = priv_key;
    this.public_key = public_key;
    this.g = g;
    this.p = p;
  }

  encrypt(msg) {
    const r = Math.random(1, p - 1);
    const blinding_factor = modExp(g, r, p);
    msg;

    return 0;
  }
}
// function ElGamal(priv_key, public_key) {
//   this.priv_key = priv_key;
//   this.public_key = public_key;
// }

//  privkey = x
//  publickey = g^x
//  encryption of m = (g^xr * m, g^r), where r is random
