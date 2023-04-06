// import dotenv from "dotenv";
// dotenv.config(); // load env vars from .env
// import { task, HardhatUserConfig } from "hardhat/config";
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// import "./tasks/index";

// const { ARCHIVE_URL, MNEMONIC } = process.env;

// if (!ARCHIVE_URL)
//   throw new Error(
//     `ARCHIVE_URL env var not set. Copy .env.template to .env and set the env var`
//   );
// if (!MNEMONIC)
//   throw new Error(
//     `MNEMONIC env var not set. Copy .env.template to .env and set the env var`
//   );

// const accounts = {
//   // derive accounts from mnemonic, see tasks/create-key
//   mnemonic: MNEMONIC,
// };

// // Go to https://hardhat.org/config/ to learn more
// const config: HardhatUserConfig = {
//   solidity: {
//     compilers: [
//       // old ethernaut compiler
//       { version: "0.4.21" },
//       { version: "0.7.3" }
//     ],
//   },
//   networks: {
//     ropsten: {
//       url: ARCHIVE_URL,
//       accounts,
//     },
//     hardhat: {
//       accounts,
//       forking: {
//         url: ARCHIVE_URL, // https://eth-ropsten.alchemyapi.io/v2/SECRET`,
//         blockNumber: 9389313,
//       },
//     },
//   },
//   mocha: {
//     timeout: 300 * 1e3,
//   }
// };

// export default config;


// import { task } from "hardhat/config";
// const { ethers } = require("ethers");
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.21",
      },

      {
        version: "0.7.3",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: "fat guard cable craft belt account midnight beach accuse fetch congress clerk divide dry exercise",
      },
    },
  },
};

// task("deploy", "Deploys the contract")
//   .setAction(async () => {
//     const contractFactory = await ethers.getContractFactory("CallMe");
//     const contract = await contractFactory.deploy();
//     await contract.deployed();
//     console.log("Contract deployed to:", contract.address);
//   });
