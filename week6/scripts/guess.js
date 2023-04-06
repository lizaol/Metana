const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const Challenge = await hre.ethers.getContractFactory("GuessTheNumberChallenge");
  const gasLimit = 400000; 
  const callenge = await Challenge.deploy({ gasLimit, value: ethers.utils.parseEther('1') });
    
  await callenge.deployed();

  console.log(`GuessTheNumberChallenge deployed to: ${callenge.address}`);
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });