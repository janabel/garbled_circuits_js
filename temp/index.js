const elgamal = require("../node_modules/elgamal/lib/elgamal.js").default;

const keygenButton = document.getElementById("keygen-button");
keygenButton.addEventListener("click", async function () {
  const eg = await elgamal.generateAsync(); // Recommended way of initialization

  const secret = "The quick brown fox jumps over the lazy dog"; // Message to encrypt

  const priv_key = await eg.x;
  const public_key = await eg.y;

  document.getElementById("keygen-out-priv").innerText += " " + priv_key;
  document.getElementById("keygen-out-public").innerText += " " + public_key;

  const encrypted = await eg.encryptAsync(secret);
  const decrypted = await eg.decryptAsync(encrypted);

  console.log(decrypted.toString() === secret);
  true;
});
