const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {

  const Solver = await hre.ethers.getContractFactory("hack");
  const solve = await Solver.deploy({ gasLimit: 1000000, value: ethers.utils.parseEther('1')});  
  await solve.deployed();

  console.log(`hack deployed to: ${solve.address}`);
  

  const tx = await solve.solve("0x5FbDB2315678afecb367f032d93F642f64180aa3")
  await tx.wait()

  const tx1 = await solve.complete("0x5FbDB2315678afecb367f032d93F642f64180aa3")
  await tx1.wait()

  console.log(tx1)

} 
 


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });