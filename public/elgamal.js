const elgamal = require("../node_modules/elgamal/lib/elgamal.js").default;

let eg = undefined; // to be remembered

const keygenButton = document.getElementById("keygen-button");
keygenButton.addEventListener("click", async function () {
  eg = await elgamal.generateAsync(256); // Recommended way of initialization

  const priv_key = await eg.x;
  const public_key = await eg.y;

  document.getElementById("keygen-out-priv").innerText += " " + priv_key;
  document.getElementById("keygen-out-public").innerText += " " + public_key;
});

const elGamalEncryptButton = document.getElementById("elg-enc-button");
elGamalEncryptButton.addEventListener("click", async function () {
  const encOutput = document.getElementById("elg-enc-output");

  console.log(typeof eg);

  if (typeof eg === "undefined") {
    console.log("eg still undefined!");
    encOutput.innerText = "Please generate a private public keypair first";
    return;
  }

  const pubKey = Number(document.getElementById("pub-key").value); // if pass in new public key, just use existing p, g
  const msg = document.getElementById("pub-enc-input").value;

  if (!pubKey || !msg) {
    document.getElementById("elg-enc-output").innerText =
      "Please enter both a public key and a message.";
    return;
  }
  console.log(typeof pubKey);

  temp_eg = new elgamal(await eg.p, await eg.g, pubKey, 0); // placeholder private key
  const ciphertext = await temp_eg.encryptAsync(msg); // =(a,b), where a = g^r is the blinding factor, b = g^rx * m is the encryption
  console.log(ciphertext.toString());
  encOutput.innerText =
    "Your ciphertext (g^r, g^rs * m) is: " +
    "(" +
    ciphertext.a.toString() +
    ", " +
    ciphertext.b.toString() +
    ")";
});
