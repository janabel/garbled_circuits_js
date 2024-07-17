import ElGamal from "elgamal";

document
  .getElementById("key-gen-button")
  .addEventListener("click", function () {
    const elgamal = ElGamal.generateAsync(14);
    const priv_key = elgamal.x;
    const public_key = elgamal.y;

    document.getElementById(
      "private-key"
    ).innerText = `Your private key is: ${priv_key}`;
    document.getElementById(
      "public-key"
    ).innerText = `Your public key is: ${public_key}`;
  });
