// import ElGamal from "elgamal";
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
