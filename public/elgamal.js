const elgamal = require("../node_modules/elgamal/lib/elgamal.js").default;
const encryptedvalue =
  require("../node_modules/elgamal/lib/models/encrypted-value.js").default;
const jsbn = require("jsbn");
const decryptedvalue =
  require("../node_modules/elgamal/lib/models/decrypted-value.js").default;

let eg = undefined; // to be remembered

const keygenButton = document.getElementById("keygen-button");
keygenButton.addEventListener("click", async function () {
  eg = await elgamal.generateAsync(256); // Recommended way of initialization

  const privKeyOutput = await eg.x;
  const publicKeyOutput = await eg.y;

  document.getElementById("keygen-out-priv").innerText += " " + privKeyOutput;
  document.getElementById("keygen-out-public").innerText +=
    " " + publicKeyOutput;
});

const elGamalEncryptButton = document.getElementById("elg-enc-button");
elGamalEncryptButton.addEventListener("click", async function () {
  const encOutput = document.getElementById("elg-enc-output");

  if (typeof eg === "undefined") {
    console.log("eg still undefined!");
    encOutput.innerText = "Please generate a private public keypair first";
    return;
  }

  const publicKeyInput = Number(document.getElementById("pub-key").value); // if pass in new public key, just use existing p, g
  const msg = document.getElementById("pub-enc-input").value;

  if (!publicKeyInput || !msg) {
    document.getElementById("elg-enc-output").innerText =
      "Please enter both a public key and a message.";
    return;
  }

  temp_eg = new elgamal(await eg.p, await eg.g, publicKeyInput, 0); // placeholder private key
  const ciphertextOutput = await temp_eg.encryptAsync(msg); // =(a,b), where a = g^r is the blinding factor, b = g^rx * m is the encryption
  encOutput.innerText =
    "Your ciphertext (g^r, g^rs * m) is: " +
    "(" +
    ciphertextOutput.a.toString() +
    ", " +
    ciphertextOutput.b.toString() +
    ")";
});

async function parseOrderedPair(pairString) {
  // Remove the parentheses
  pairString = pairString.replace(/[()]/g, "");

  // Split the string by the comma
  const values = pairString.split(",");

  // Convert the string values to numbers
  const a = new jsbn.BigInteger(values[0].trim());
  const b = new jsbn.BigInteger(values[1].trim());

  const encryptedValue = new encryptedvalue(a, b);
  return encryptedValue;
}

const elGamalDecryptButton = document.getElementById("elg-dec-button");
elGamalDecryptButton.addEventListener("click", async function () {
  const decOutput = document.getElementById("elg-dec-output");

  if (typeof eg === "undefined") {
    console.log("eg still undefined!");
    decOutput.innerText = "Please generate a private public keypair first";
    return;
  }

  const privKeyInput = Number(document.getElementById("private-key").value); // if pass in new private key, just use existing p, g
  const ciphertextTextInput =
    document.getElementById("private-dec-input").value;
  if (!privKeyInput || !ciphertextTextInput) {
    document.getElementById("elg-dec-output").innerText =
      "Please enter both a private key and a ciphertext.";
    return;
  }

  // otherwise parse privKeyInput into
  let ciphertextProcessed = await parseOrderedPair(ciphertextTextInput);
  if (!ciphertextProcessed.a || !ciphertextProcessed.b) {
    document.getElementById("elg-dec-output").innerText =
      "Please enter a valid ciphertext";
    return;
  }

  console.log("type of a is " + typeof ciphertextProcessed.a);
  console.log(ciphertextProcessed.a.toString());
  console.log(ciphertextProcessed.b.toString());

  temp_eg = new elgamal(eg.p, eg.g, 0, privKeyInput); // placeholder public key
  console.log("temp_eg = " + temp_eg);
  const message = await temp_eg.decryptAsync(ciphertextProcessed); // =(a,b), where a = g^r is the blinding factor, b = g^rx * m is the encryption
  // const fakemsg = new decryptedvalue("10");
  console.log(message);
  console.log("message is " + message.toString());
  // decOutput.innerText = "Your plaintext is: " + message.toString();
});
