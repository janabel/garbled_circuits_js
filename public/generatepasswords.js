// key has to be at least as long as plaintext
// ok our plaintexts are passwords and the keys are concatenations of the passwords
// so no matter the lengths of our passwords, as long as constant should be fine
// ok then say our passwords are max 128 bits. round to 100 bits just in case there's random junk in conversions
// so that we can use AES-256

import { text } from "body-parser";
import CryptoJS from "crypto-js";

// global var passwords
passwords = {
  b0: { 0: undefined, 1: undefined },
  b1: { 0: undefined, 1: undefined },
  b2: { 0: undefined, 1: undefined },
  1: { 0: undefined, 1: undefined }, // "<gate #>: {<b=0>: , <b=1>: }"
  2: { 0: undefined, 1: undefined },
  3: { 0: undefined, 1: undefined },
  4: { 0: undefined, 1: undefined },
  5: { 0: undefined, 1: undefined },
  6: { 0: undefined, 1: undefined },
  7: { 0: undefined, 1: undefined },
};

// console.log(passwords);

function generateRandom32BitInteger() {
  // Create a Uint8Array with 4 bytes (32 bits)
  const array = new Uint8Array(4);
  window.crypto.getRandomValues(array);

  // Convert the byte array to a BigInt
  let hexString = "";
  array.forEach((byte) => {
    hexString += byte.toString(16).padStart(2, "0");
  });

  // Convert hex string to BigInt
  return BigInt("0x" + hexString);
}

generatePasswordsButton = document.getElementById("generatePasswordsButton");
generatePasswordsButton.addEventListener("click", function () {
  for (key in passwords) {
    passwords[key][0] = generateRandom32BitInteger();
    passwords[key][1] = generateRandom32BitInteger();
  }

  passwordText = document.getElementById("passwordStatus").innerText =
    "Passwords generated!";

  // console.log(passwords);
});
