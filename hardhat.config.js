// /** @type import('hardhat/config').HardhatUserConfig */
// require("@nomiclabs/hardhat-ganache");
// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     hardhat: {
//       forking: {
//         url: "https://eth-mainnet.g.alchemy.com/v2/wcuHcqsV9201cLJoo_jvNo0_Ap8wjztA"
//       }
//     }
//   }
// };

// import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  coverage: {
    skipFiles: [
      "./contracts/forge.sol:onERC1155Received",
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/wcuHcqsV9201cLJoo_jvNo0_Ap8wjztA",
      },
    },
  },
  // etherscan: {
  //   apiKey: {
  //     goerli: "23YR8JBYJ7JYYF2JY6J83MXJW8K7TUTA71"
  //   }
  // }
};







task("accounts", "Prints the list of accs", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
