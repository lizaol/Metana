// //      CallMe.sol
// const hre = require("hardhat");
// const { ethers } = require("ethers");

// async function main() {
//   const CallMeChallenge = await hre.ethers.getContractFactory("CallMeChallenge");
//   const callMeChallenge = await CallMeChallenge.deploy();

//   await callMeChallenge.deployed();

//   console.log(`CallMeChallenge deployed to: ${callMeChallenge.address}`);
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });


////            Nickname.sol
const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const nickChallenge = await hre.ethers.getContractFactory("CaptureTheEther");
  const nick = await nickChallenge.deploy();

  await nick.deployed();

  console.log(`CallMeChallenge deployed to: ${nick.address}`);
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });