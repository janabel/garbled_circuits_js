# garbled_circuits_js

implementation of yao's garbled circuits in javascript.

cryptographic components:

- hash function: sha256 (js library)
- symmetric key encryption: AES (js library)
- public key encryption (for OT): El Gamal (js library)

---

dev:

- make sure you're using node 16 (some libraries used not backwards compatible)
- to run the main page public/index.html:

```bash
npm run devmain
```

- to see gates table only (public/garbledgates.html):

```bash
npm run devtables
```

- to see (TODO) circuit diagram only (public/circuitdisplay.html):

```bash
npm run devtables
```

---

TODO:

- make OT part - have Bob have to generate public key and send over in correct order (instead of just typing in bits to index into passwords away)
- make circuit diagram html with text boxes on the wires for user to fill out
- also want something for arbitrary circuits - rn there's a circuit represented as a dictionary of gates and each gate object has like incoming gate ids stored as well as the function to compute (see computepasswords.html and gate.js).

  - garbled gate tables are already computed automatically from this, so should be able to have user input their circuit eventually

symmetric key:

- use AES libraries

- get elgamal to work with keygen
- implement elgamal
- dont forget to switch to node 16 (done)
