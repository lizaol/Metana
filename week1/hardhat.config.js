require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  settings: {

     
    remappings: {
      "@openzeppelin/contracts": "./node_modules/@openzeppelin/contracts",
    },
  },
};
