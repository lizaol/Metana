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
  game = await ethers.getContractFactory("GuessTheNewNumber")
      .then((factory) => factory.deploy({ value: ethers.utils.parseEther("1") }));

  hack = await ethers.getContractFactory("GuessNewAnswer")
      .then((factory) => factory.deploy(game.address, { value: ethers.utils.parseEther("1") }));
});

it("guess New", async function () {
  console.log("hack:", hack.address)
  const tx = await hack.solve({value: ethers.utils.parseEther("1")} );
  await tx.wait()
  
  // const tx1 = await game.iComplete()
  // await tx1.wait()

  // console.log(tx1)
  const balance = await ethers.provider.getBalance(game.address);
  // const isComplete = await contract.isComplete()
  // expect(isComplete).to.be.true;
  console.log("bal: ", balance)
});

 
 