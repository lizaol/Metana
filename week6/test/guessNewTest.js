const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
// require("@nomicfoundation/hardhat-chai-matchers");


let accounts;
let eoa;
let game; // challenge contract
let hack;

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  game = await ethers.getContractFactory("GuessTheNewNumberChallenge")
      .then((factory) => factory.deploy({ value: ethers.utils.parseEther("1") }));

  hack = await ethers.getContractFactory("GuessNewAnswer")
      .then((factory) => factory.deploy(game.address, { value: ethers.utils.parseEther("1") }));
});

it("guess New", async function () {
  console.log("hack:", hack.address)
  const tx = await hack.solve();
  await tx.wait()
  
  const tx1 = await hack.isComplete()
  // await tx1.wait()

  console.log("tx1:", tx1)
  expect(tx1).to.be.true;
});

 
 