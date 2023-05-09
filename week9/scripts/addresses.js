const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();

  console.log("List of accounts and their addresses:");
  accounts.forEach((account, index) => {
    console.log(`[${index}] ${account.address}`);
  });
}

main();
