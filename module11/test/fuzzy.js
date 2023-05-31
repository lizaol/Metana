const { ethers } = require("hardhat");
const { expect } = require("chai");
const { assert } = require("console");

describe('FuzzyIdentityChallenge', () => {
  let target;
  let attacker;
  let deployer;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    // target = await (await ethers.getContractFactory('FuzzyIdentityChallenge', deployer)).deploy();

    // await target.deployed();
    target = await ethers.getContractFactory("FuzzyIdentityChallenge")
      .then((factory) => factory.deploy());

    // target = target.connect(attacker);
  });

  it('exploit', async () => {
    console.log(await target.authenticate())

    expect(await target.isComplete()).to.equal(true);
  });
});