const { ethers } = require("hardhat");
const { expect } = require("chai");
const { assert } = require("console");

before(async () => {
  challenge = await ethers.getContractFactory("PredictTheFutureChallenge")
      .then((factory) => factory.deploy( { value: ethers.utils.parseEther("1") } ));
  solver = await ethers.getContractFactory("PredictTheFutureAnswer")
      .then((factory) => factory.deploy(challenge.address));

});

  it('predicts the future', async () => {
    let guess = 0;
    
    await solver.lockInGuess(guess, { value: ethers.utils.parseEther("1") });
    // call withdraw to go to the next block
    await solver.withdraw();

    while (! await challenge.isComplete()) {
      console.log("Try guess...");
      await solver.guess(guess);
    }
    // console.log(await )
    // expect(await challenge.isComplete()).to.be.true
    assert(
      await challenge.isComplete() === true,
      'Challenge has not been completed!'
    );
  });

