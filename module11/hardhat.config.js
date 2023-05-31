// import { task } from "hardhat/config";
// const { ethers } = require("ethers");
require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.21",
      },

      {
        version: "0.7.3",
      },
      {
        version: "0.8.17",
      },
    ],
  },
  settings: {
    remappings: {
      "@openzeppelin/contracts": "./node_modules/@openzeppelin/contracts",
    },
  },
  networks: {
    // hardhat: {
    //   chainId: 1337,
    //   accounts: {
    //     mnemonic: "fat guard cable craft belt account midnight beach accuse fetch congress clerk divide dry exercise",
    //   },
    // },
    local: {
      url: "http://localhost:8545",
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
  },
};


