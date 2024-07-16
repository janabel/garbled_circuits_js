import { sha256 } from "./node_modules/crypto-js";

function sha256Wrapper(x) {
  // just practicing function syntax : ). computes sha256
  return sha256(input);
}

document.getElementById("hash-button").addEventListener("click", function () {
  // Get the value from the textbox
  const inputValue = document.getElementById("hash-input").value;
  console.log(typeof inputValue); // wow logging

  // Convert the input value to a number
  const number = parseFloat(inputValue);

  // Check if the input is a valid number
  if (isNaN(number)) {
    document.getElementById("result").innerText =
      "Please enter a valid number.";
    return;
  }

  // Compute a function (e.g., square the number)
  const result = sha256(number);

  // Display the result
  document.getElementById("hash-output").innerText = `The result is: ${result}`;
});
