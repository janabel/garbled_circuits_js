import { concat } from "ethers";
import CryptoJS from "crypto-js";

export class BinaryGate {
  // Constructor method to initialize the object
  constructor(
    gateId,
    leftGateId,
    rightGateId,
    gateFunction = undefined,
    outGate = false
  ) {
    (this.gateId = gateId), (this.leftGateId = leftGateId);
    this.rightGateId = rightGateId;
    this.gateFunction = gateFunction;
    this.gateTableData = { passHashes: [], passEncryptions: [] }; // (key, val) = (hash(passes), encryp(passes))
    this.outGate = outGate;

    console.assert(
      this.gateFunction.length == 2,
      `Gate function should take 2 inputs but takes in ${this.gateFunction.length}`
    );
  }

  setFunction(f) {
    this.gateFunction = f;
  }

  setLeftGateID(leftGateId) {
    this.leftGateId = leftGateId;
  }
  setRightGateID(rightGateId) {
    this.rightGateId = rightGateId;
  }

  computeGateTableData(passwords) {
    console.log("computing gate table data for gate " + this.gateId);
    for (const pair of [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]) {
      let b0 = pair[0];
      let b1 = pair[1];
      let b_out = this.gateFunction(b0, b1);
      let output_pass = passwords[this.gateId][b_out].toString();
      console.log("output_pass = " + output_pass);
      let concat_pass =
        passwords[this.leftGateId][b0].toString() +
        passwords[this.rightGateId][b1].toString();
      console.log("concat_pass = " + concat_pass);
      let hash_concat_pass = CryptoJS.SHA256(concat_pass).toString(
        CryptoJS.enc.Hex
      );
      let enc_output_pass = CryptoJS.AES.encrypt(
        output_pass,
        concat_pass
      ).toString();
      console.log("enc_output_pass = " + enc_output_pass);

      this.gateTableData["passHashes"].push(hash_concat_pass);
      // adding either enc(pass for b_out) or enc(b_out) encryptions to table data, depending on whether or not gate is output gate
      if (this.outGate) {
        let enc_output = CryptoJS.AES.encrypt(
          b_out.toString(),
          concat_pass
        ).toString();
        this.gateTableData["passEncryptions"].push(enc_output);
      } else {
        let enc_output_pass = CryptoJS.AES.encrypt(
          output_pass,
          concat_pass
        ).toString();
        this.gateTableData["passEncryptions"].push(enc_output_pass);
      }
    }

    console.log(this.gateTableData);
  }
}

export class SingleGate {
  // Constructor method to initialize the object
  constructor(gateId, inGateId, gateFunction = undefined, outGate = false) {
    this.gateId = gateId;
    this.inGateId = inGateId;
    this.gateFunction = gateFunction;
    this.gateTableData = { passHashes: [], passEncryptions: [] }; // (key, val) = (hash(passes), encryp(passes))
    this.outGate = outGate;

    console.assert(
      this.gateFunction.length == 1,
      `Gate function should take 1 input but takes in ${this.gateFunction.length}`
    );
  }

  setFunction(f) {
    this.gateFunction = f;
  }

  setLeftGateID(leftGateId) {
    this.leftGateId = leftGateId;
  }
  setRightGateID(rightGateId) {
    this.rightGateId = rightGateId;
  }

  computeGateTableData(passwords) {
    const passes = passwords[this.leftGateId];
    for (const b_in in [0, 1]) {
      let b_out = this.gateFunction(b_in);
      let output_pass = passwords[this.gateId][b_out].toString();

      let pass = passwords[this.inGateId][b_in].toString();
      console.log("pass = " + pass);
      let hash_pass = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
      console.log("hash_pass = " + hash_pass);

      this.gateTableData["passHashes"].push(hash_pass);

      // adding either enc(pass for b_out) or enc(b_out) encryptions to table data, depending on whether or not gate is output gate
      if (this.outGate) {
        let enc_output = CryptoJS.AES.encrypt(
          b_out.toString(),
          pass
        ).toString();
        this.gateTableData["passEncryptions"].push(enc_output);
      } else {
        let enc_output_pass = CryptoJS.AES.encrypt(
          output_pass,
          pass
        ).toString();
        this.gateTableData["passEncryptions"].push(enc_output_pass);
      }
    }

    console.log(this.gateTableData);
  }
}
