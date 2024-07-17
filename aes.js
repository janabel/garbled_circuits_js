document.getElementById("enc-button").addEventListener("click", function() {
    const encKey = document.getElementById("enc-key").innerText;
    const encText = document.getElementById("enc-input").innerText;
    const encrypted = CryptoJS.AES.encrypt(encText, encKey);
    document.getElementById("enc-output") = encrypted;
})