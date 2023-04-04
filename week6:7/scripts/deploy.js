const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CaptureTheEther = await ethers.getContractFactory("CaptureTheEther");
  const cte = await CaptureTheEther.deploy();

  console.log("CaptureTheEther deployed to:", cte.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
