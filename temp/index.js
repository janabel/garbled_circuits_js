const elgamal = require("../node_modules/elgamal/lib/elgamal.js").default;

console.log("Index yay");
console.log(elgamal);

const keygenButton = document.getElementById("keygen-button");
keygenButton.addEventListener("click", async function () {
    const eg = await elgamal.generateAsync(); // Recommended way of initialization
    const secret = 'The quick brown fox jumps over the lazy dog';
    const encrypted = await eg.encryptAsync(secret);
    const decrypted = await eg.decryptAsync(encrypted);
    
    console.log(decrypted.toString() === secret); // true
});