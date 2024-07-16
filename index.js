function sha256Wrapper(x) {
    return CryptoJS.SHA256(x).toString(CryptoJS.enc.Hex);
  }

  document.getElementById("hash-button").addEventListener("click", function () {
    const inputValue = document.getElementById("hash-input").value;
    
    if (!inputValue) {
      document.getElementById("hash-output").innerText = "Please enter a string to hash.";
      return;
    }

    const result = sha256Wrapper(inputValue);
    document.getElementById("hash-output").innerText = `The result is: ${result}`;
  });