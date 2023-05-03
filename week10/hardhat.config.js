require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan")
const {ALCHEMY_URL, MNEMONIC, ETHERSCAN_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: ALCHEMY_URL,
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 11155111,
    },
    
  },
  etherscan: {
        url: "https://api.etherscan.io/api",
        apiKey: ETHERSCAN_KEY
      }
};
