// (a0,a1,a2) = (1,0,1)

import { BinaryGate, SingleGate } from "./gate";

let gateFunctions = {
  1: a0a1GreaterGate,
  2: a0a1EqualGate,
  3: andGate,
  4: a2GreaterGate,
  5: orGate,
};

function a0a1GreaterGate(x0, x1) {
  // x0, x1 are bits
  return_values = {
    "00": 1,
    "01": 1,
    10: 0,
    11: 0,
  };

  return return_values[x0.toString() + x1.toString()];
}

function a0a1EqualGate(x0, x1) {
  return_values = {
    "00": 0,
    "01": 0,
    10: 1,
    11: 0,
  };

  return return_values[x0.toString() + x1.toString()];
}

function andGate(x0, x1) {
  return +(x0 == 1 && x1 == 1);
}

function a2GreaterGate(x0) {
  return +(1 > x0);
}

function orGate(x0, x1) {
  return +(x0 == 1 || x1 == 1);
}

// represent circuit architecture as gates (can think of initial passwords as gate outputs, has id)
// each gate has either 2 inputs from incoming left/right gates, or just a single input from a gate

circuit = {
  1: new BinaryGate(
    (gateId = 1),
    (leftGateId = "b0"),
    (rightGateId = "b1"),
    (gateFunction = a0a1GreaterGate)
  ),
  2: new BinaryGate(
    (gateId = 2),
    (leftGateId = "b0"),
    (rightGateId = "b1"),
    (gateFunction = a0a1EqualGate)
  ),
  3: new SingleGate(
    (gateId = 3),
    (inGateId = "b2"),
    (gateFunction = a2GreaterGate)
  ),
  4: new BinaryGate(
    (gateId = 4),
    (leftGateId = 2),
    (rightGateId = 3),
    (gateFunction = andGate)
  ),
  5: new BinaryGate(
    (gateId = 5),
    (leftGateId = 1),
    (rightGateId = 4),
    (gateFunction = orGate)
  ),
};

document.getElementById("computeButton").addEventListener("click", function () {
  // Compute data for tables
  for (const gateId in circuit) {
    let gate = circuit[gateId];
    gate.computeGateTableData(passwords);
    generateTable(gate);
    // const currentTable = document.getElementById("table" + key);
    // currentTable.innerHTML = generateTableHTML(tableData[key]);
  }
});

function generateTable(gate) {
  let gateTableData = gate.gateTableData;
  let gateId = gate.gateId;
  // console.log("gateTableData = ");
  // console.log(gateTableData);

  // Create a new table element
  let table = document.createElement("table");

  let tabletitle = document.createElement("tabletitle");
  tabletitle.textContent = "Table for Gate " + gateId;

  // Create the table header
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");

  // Add table headers for columns
  let nicePassConcatString = "";
  if (gate.leftGateId) {
    let leftGateId = gate.leftGateId;
    let rightGateId = gate.rightGateId;
    nicePassConcatString +=
      "p_{b_l}^{(" +
      leftGateId +
      ")}" +
      " || p_{b_r}^" +
      "{(" +
      rightGateId +
      ")}";
  } else {
    let inGateId = gate.inGateId;
    nicePassConcatString += "p_{b_l}^{(" + inGateId + ")}";
  }

  let th1 = document.createElement("th");
  th1.textContent = "$hash(" + nicePassConcatString + ")$";
  headerRow.appendChild(th1);

  let th2 = document.createElement("th");
  th2.textContent =
    "$Enc_{" +
    nicePassConcatString +
    "}(p_{G(" +
    nicePassConcatString +
    ")}^{(" +
    gate.gateId +
    ")})$";
  headerRow.appendChild(th2);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  let tbody = document.createElement("tbody");

  // Loop through the arrays and create rows for each pair of values
  for (let i = 0; i < gateTableData["passHashes"].length; i++) {
    let row = document.createElement("tr");

    let passHashCell = document.createElement("td");
    passHashCell.textContent = gateTableData["passHashes"][i];
    row.appendChild(passHashCell);

    let passEncryptionCell = document.createElement("td");
    passEncryptionCell.textContent = gateTableData["passEncryptions"][i];
    row.appendChild(passEncryptionCell);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append the table to the body (or any other container element)
  document.body.appendChild(tabletitle);
  document.body.appendChild(table);

  MathJax.typeset(); // Process the newly added LaTeX
}
