const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const Challenge = await hre.ethers.getContractFactory("GuessTheRandomNumberChallenge");
  const gasLimit = 400000; 
  const callenge = await Challenge.deploy({ gasLimit, value: ethers.utils.parseEther('1') });
    
  await callenge.deployed();

  console.log(`GuessTheRandomNumberChallenge deployed to: ${callenge.address}`);
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });