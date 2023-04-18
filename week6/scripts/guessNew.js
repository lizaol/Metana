const hre = require("hardhat");
const { ethers } = require("ethers");
const BigNumber = require('bignumber.js');

async function main() {
  const Challenge = await hre.ethers.getContractFactory("GuessTheNewNumberChallenge");
  const gasLimit = 300000; 
  const game = await Challenge.deploy({ gasLimit, value: ethers.utils.parseEther('1') });
    
  await game.deployed();

  console.log(`GuessTheNewNumberChallenge deployed to: ${game.address}`);
  // console.log()
  // for(let i=0; i<256; i++){
  //   if(i == game.answer){
  //     const tx = await game.guess(i, {value: ethers.utils.parseEther("1")})
  //     await tx.wait()
  //   }
  // }
  // console.log(await game.isComplete())
  const maxGuess = 256; // maximum possible guess value
  const guessValue = ethers.utils.parseEther('1'); // value to send with each guess
  let answerFound = false;
  let answer;
  for (let i = 0; i < maxGuess && !answerFound; i++) {
    // Generate a guess
    const guess = i

    // Send the guess to the contract
    const tx = await game.guess(guess, { value: guessValue });
    await tx.wait();

    // Check if the answer was found
    const balance = await game.provider.getBalance(game.address);
    if (balance.eq(0)) {
      answerFound = true;
      answer = guess;
    }
  }

  console.log(`Answer found: ${answer}`);
  // const tx = await game.guess(answer, {value: ethers.utils.parseEther("1")})
  // await tx.wait()

  console.log(await game.isComplete())
} 



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });