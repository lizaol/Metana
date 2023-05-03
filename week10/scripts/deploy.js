// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers, upgrades} = require("hardhat")

async function main() {
  // Deploy ERC20 token
  const erc20UpFactory = await ethers.getContractFactory('erc20Up');
  const erc20Up = await upgrades.deployProxy(erc20UpFactory, {initializer: "initialize"})
  await erc20Up.deployed();   
  console.log('erc20Up deployed to:', erc20Up.address);   //0x698e7f574B4315eF1804Fadb1e16b9e7d1E3Ff9A
  // Verifying implementation: 0x787dC4dc6892115503F31cDE4D0e9b4581860b39
  // The contract 0x787dC4dc6892115503F31cDE4D0e9b4581860b39 has already been verified
  // Verifying proxy: 0x698e7f574B4315eF1804Fadb1e16b9e7d1E3Ff9A
  // Contract at 0x698e7f574B4315eF1804Fadb1e16b9e7d1E3Ff9A already verified.
  // Linking proxy 0x698e7f574B4315eF1804Fadb1e16b9e7d1E3Ff9A with implementation
  // Successfully linked proxy to implementation.
  // Verifying proxy admin: 0x8c09Aac3F1F3440cba08eA5C7B1AfA970c7F6d5A
  // Contract at 0x8c09Aac3F1F3440cba08eA5C7B1AfA970c7F6d5A already verified.
  // Deploy ERC721 token
  const erc721UpFactory = await ethers.getContractFactory('erc721Up');
  const erc721Up = await upgrades.deployProxy(erc721UpFactory, {initializer: "initialize"})
  await erc721Up.deployed();
  console.log('erc721Up deployed to:', erc721Up.address);   //0x5AD415b5F81A5eF06649662d491E46190e71eEDC
  // Verifying implementation: 0xca2492279C668A47851A67F433a5A2D81ab5B982
  // The contract 0xca2492279C668A47851A67F433a5A2D81ab5B982 has already been verified
  // Verifying proxy: 0x5AD415b5F81A5eF06649662d491E46190e71eEDC
  // Contract at 0x5AD415b5F81A5eF06649662d491E46190e71eEDC already verified.
  // Linking proxy 0x5AD415b5F81A5eF06649662d491E46190e71eEDC with implementation
  // Successfully linked proxy to implementation.
  // Verifying proxy admin: 0x8c09Aac3F1F3440cba08eA5C7B1AfA970c7F6d5A
  // Contract at 0x8c09Aac3F1F3440cba08eA5C7B1AfA970c7F6d5A already verified.
  // Deploy staking contract and initialize it with ERC20 and ERC721 contracts
  const stakingUpFactory = await ethers.getContractFactory('stakingUp');
  const stakingUp = await upgrades.deployProxy(stakingUpFactory, [erc20Up.address, erc721Up.address], {initializer: "initialize"})
  await stakingUp.deployed();
  console.log('stakingUp deployed to:', stakingUp.address);   //0x5f5bf8f61f95E8b73F11C907e60Fa58757B07e50
//   Successfully verified contract stakingUp on Etherscan.
// https://sepolia.etherscan.io/address/0xbc16b97ad1dbdd1f486Baa0D28EFae2A9D4e410B#code
// Verifying proxy: 0x5f5bf8f61f95E8b73F11C907e60Fa58757B07e50
// Contract at 0x5f5bf8f61f95E8b73F11C907e60Fa58757B07e50 already verified.
// Linking proxy 0x5f5bf8f61f95E8b73F11C907e60Fa58757B07e50 with implementation
// Successfully linked proxy to implementation.
// Verifying proxy admin: 0x8c09Aac3F1F3440cba08eA5C7B1AfA970c7F6d5A
// Contract at 0x8c09Aac3F1F3440cba08eA5C7B1AfA970c7F6d5A already verified.
}

// We recommend this pattern to be able to  use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
