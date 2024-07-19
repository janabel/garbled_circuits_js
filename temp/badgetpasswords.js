function loadFile() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "passwords.txt", true); // Replace 'example.txt' with your file path

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      document.getElementById("passwords").textContent = xhr.responseText;
    } else {
      document.getElementById("passwords").textContent =
        "Error loading file: " + xhr.statusText;
    }
  };

  xhr.onerror = function () {
    document.getElementById("passwords").textContent = "Error loading file.";
  };

  xhr.send();
}

// Call the function to load the file
loadFile();
