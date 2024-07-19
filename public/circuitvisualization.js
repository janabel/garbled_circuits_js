import { BinaryGate, SingleGate } from "./gate";

// Define the circuit object
const circuit = {
  1: {
    type: "BinaryGate",
    gateId: 1,
    leftGateId: "b0",
    rightGateId: "b1",
    gateFunction: "a0a1GreaterGate",
  },
  2: {
    type: "BinaryGate",
    gateId: 2,
    leftGateId: "b0",
    rightGateId: "b1",
    gateFunction: "a0a1EqualGate",
  },
  3: {
    type: "SingleGate",
    gateId: 3,
    inGateId: "b2",
    gateFunction: "a2GreaterGate",
  },
  4: {
    type: "BinaryGate",
    gateId: 4,
    leftGateId: 2,
    rightGateId: 3,
    gateFunction: "andGate",
  },
  5: {
    type: "BinaryGate",
    gateId: 5,
    leftGateId: 1,
    rightGateId: 4,
    gateFunction: "orGate",
  },
};

// SVG container
const svg = document.getElementById("circuit-svg");

// Positions for the gates
const gatePositions = {
  b0: { x: 5, y: 100 },
  b1: { x: 5, y: 100 },
  b2: { x: 5, y: 200 },
  1: { x: 50, y: 100 },
  2: { x: 50, y: 200 },
  3: { x: 200, y: 150 },
  4: { x: 350, y: 150 },
  5: { x: 500, y: 150 },
};

// Function to create a gate element
function createGate(gateId, type, x, y) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", 80);
  rect.setAttribute("height", 40);
  rect.setAttribute("class", "gate");
  rect.setAttribute("id", `gate-${gateId}`);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x + 10);
  text.setAttribute("y", y + 25);
  text.setAttribute("font-size", "14");
  text.setAttribute("fill", "black");
  text.textContent = `Gate ${gateId}`;

  svg.appendChild(rect);
  svg.appendChild(text);
}

// Function to create a wire (line) element
function createWire(x1, y1, x2, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("class", "wire");

  svg.appendChild(line);
}

// Draw all gates
for (let [id, gate] of Object.entries(circuit)) {
  const { gateId, type } = gate;
  const { x, y } = gatePositions[gateId];
  createGate(gateId, type, x, y);
}

// Draw all wires
for (let [id, gate] of Object.entries(circuit)) {
  const { gateId, leftGateId, rightGateId, inGateId } = gate;
  console.log({ gateId, leftGateId, rightGateId, inGateId });
  const { x: x1, y: y1 } = gatePositions[gateId];

  if (leftGateId) {
    const { x: x2, y: y2 } = gatePositions[leftGateId];
    console.log({ x: x2, y: y2 });
    const { x: x3, y: y3 } = gatePositions[rightGateId];
    createWire(x1 + 20, y1 + 20, x2 + 20, y2 + 20); // Left wire
    createWire(x1 + 60, y1 + 20, x3 + 20, y3 + 20); // Right wire
  } else {
    const { x: x2, y: y2 } = gatePositions[inGateId];
    console.log({ x: x2, y: y2 });
    createWire(x1 + 40, y1, x2 + 40, y2 + 40); // Single wire
  }

  createWire(0, 0, 100, 100);
}
