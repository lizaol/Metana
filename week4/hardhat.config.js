require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: {
//       version: "0.8.18",
//       sources: {
//           "path": "../week1/erc20PartialRefund.sol",
//       },
//   },
//
//   networks: {
//     hardhat: {
//       forking: {
//         url: "https://eth-mainnet.g.alchemy.com/v2/wcuHcqsV9201cLJoo_jvNo0_Ap8wjztA",
//       },
//     },
//   },
//   // etherscan: {
//   //   apiKey: {
//   //     goerli: "23YR8JBYJ7JYYF2JY6J83MXJW8K7TUTA71"
//   //   }
//   // }
// };
module.exports = {
  solidity: {
    version: "0.5.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "../week1/erc20PartialRefund.sol",
    // tests: "./test",
    // cache: "./cache",
    // artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000,
  },
};

task("accounts", "Prints the list of accs", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
