/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ganache");
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/wcuHcqsV9201cLJoo_jvNo0_Ap8wjztA"
      }
    }
  }
};
