document.getElementById("enc-button").addEventListener("click", function () {
  console.log("Encrypting stuff");
  const encKey = document.getElementById("enc-key").value;
  const encText = document.getElementById("enc-input").value;
  const encrypted = CryptoJS.AES.encrypt(encText, encKey).toString();
  document.getElementById("enc-output").innerText = encrypted;
});

document.getElementById("dec-button").addEventListener("click", function () {
  console.log("Decrypting stuff");
  const decKey = document.getElementById("dec-key").value;
  const decText = document.getElementById("dec-input").value;
  const decrypted = CryptoJS.AES.decrypt(decText, decKey).toString(
    CryptoJS.enc.Utf8
  );
  console.log("Moving on down");
  console.log(decrypted);
  document.getElementById("dec-output").innerText = decrypted;
});
