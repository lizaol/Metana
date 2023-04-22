const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const accounts = await hre.ethers.getSigner();
  // const signers = await hre.ethers.getSigners();

  // console.log("List of accounts:");

  // for (let i = 0; i < signers.length; i++) {
  //   // console.log(`${i}: ${await signers[i].getAddress()}`);
  //   const balance = await signers[i].getBalance();
  //   console.log(`${i}: ${await signers[i].getAddress()} (balance: ${balance.toString()})`);
  // }
  const Challenge = await hre.ethers.getContractFactory("GuessTheNewNumberChallenge");
  // const gasLimit = 400000; 
  // const gas = 500000; 
  const game = await Challenge.deploy({ gasLimit: 400000, value: ethers.utils.parseEther('1'), from: accounts[0] });
  await game.deployed();

  // const Solver = await hre.ethers.getContractFactory("hack");
  // const solve = await Solver.deploy({ gasLimit: 1000000, value: ethers.utils.parseEther('1'), from: accounts[0] });  
  // await solve.deployed();

  console.log(`GuessTheNewNumberChallenge deployed to: ${game.address}`);
  // console.log(`hack deployed to: ${solve.address}`);
  

  // const tx = await solve.solve()
  // await tx.wait()
  // console.log(await solve.answer)
  // console.log(await game.isComplete())
} 
 


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });