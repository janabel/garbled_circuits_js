const elGamalTestButton = document.getElementById("elg-test-button");
elGamalTestButton.addEventListener("click", async function () {
  console.log("El gamal testing");
  testEg = await elgamal.generateAsync(44);
  console.log(testEg);
  const msg = "hi";
  const cpt = await testEg.encryptAsync(msg);
  console.log("cpt string");
  console.log(cpt.a);
  console.log(cpt.b);
  const aString = cpt.a.toString();
  const bString = cpt.b.toString();
  const aBigInt = new jsbn.BigInteger(aString.trim());
  const bBigInt = new jsbn.BigInteger(bString.trim());
  console.log(cpt.a.toString());
  console.log(cpt.b.toString());
  console.log("new bigints");
  console.log(aBigInt);
  console.log(bBigInt);
  const cpt2 = new encryptedvalue(aBigInt, bBigInt);
  const msgDec = await testEg.decryptAsync(cpt);
  const msgDec2 = await testEg.decryptAsync(cpt2);
  console.log("done with test");
  console.log(cpt);
  console.log(msgDec);
  console.log(msgDec.bi);
  console.log(msgDec.toString());
  console.log(msgDec2.toString());
});
