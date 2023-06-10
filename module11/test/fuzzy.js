const { ethers } = require("hardhat");
const { expect } = require("chai");
const { assert } = require("console");

describe('FuzzyIdentityChallenge', () => {
  let target;
  let attacker;
  let deployer;

  beforeEach(async () => {
    [attacker, deployer] = await ethers.getSigners();

    // target = await (await ethers.getContractFactory('FuzzyIdentityChallenge', deployer)).deploy();

    // await target.deployed();
    const fuzzyAnswerFactory = await ethers.getContractFactory("fuzzyAnswer");
    target = await fuzzyAnswerFactory.deploy();
    await target.deployed();

      // console.log('Contract deployed to:', target.address);
      // console.log('Contract bytecode:', target.deployTransaction.data);
  });

  it('exploit', async () => {
    // console.log(await target.authenticate())
    console.log('Contract deployed to:', target.address);
    console.log('Contract bytecode:', target.deployTransaction.data);
    // expect(await target.isComplete()).to.equal(true);
  });
});