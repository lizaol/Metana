const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
// require("@nomicfoundation/hardhat-chai-matchers");


let accounts;
let acc;
let game;

before(async () => {
  accounts = await ethers.getSigners();
  acc = accounts[0];
  game = await ethers.getContractFactory("TokenWhaleChallenge")
      .then((factory) => factory.deploy());

});

it("guess New", async function () {
  console.log("whale:", game.address)
  
  const balance = await ethers.provider.getBalance(game.address);
  // const isComplete = await contract.isComplete()
  // expect(isComplete).to.be.true;
  console.log("bal: ", balance)
});

 
