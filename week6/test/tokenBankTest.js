const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
// require("@nomicfoundation/hardhat-chai-matchers");


let accounts;
let acc;
let game; // challenge contract
let hack;

before(async () => {
  accounts = await ethers.getSigners();
  acc = accounts[0].address;
  game = await ethers.getContractFactory("TokenBankChallenge")
      .then((factory) => factory.deploy(acc));

  hack = await ethers.getContractFactory("TokenBankAnswer")
      .then((factory) => factory.deploy(game.address));
});

it("token bank", async function () {
  console.log("hack:", hack.address)
  // const tx = await hack.attack()
  // await tx.wait()

  console.log("bal acc1: ", await game.balanceOf(acc))
//   console.log("bal: ", balance)
});

 
 