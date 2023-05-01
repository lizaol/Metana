// require("@nomicfoundation/hardhat-chai-matchers");
// require("@nomiclabs/hardhat-ethers");
// require('@openzeppelin/hardhat-upgrades');
// require('hardhat-dependency-compiler');

require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.21",
      },

      {
        version: "0.8.0",
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



// module.exports = {
//     networks: {
//       hardhat: {
//         allowUnlimitedContractSize: true
//       }
//     },
//     solidity: {
//       compilers: [
//         { version: "0.8.16" },
//         { version: "0.8.0" },
//         { version: "0.7.6" },
//         { version: "0.6.6" }
//       ],
//       // settings: {
//       //   "remappings": [
//       //       "@openzeppelin/contracts"
//       //   ]
//     }
    
//     },
//     dependencyCompiler: {
//       paths: [
//         '@gnosis.pm/safe-contracts/contracts/GnosisSafe.sol',
//         '@gnosis.pm/safe-contracts/contracts/proxies/GnosisSafeProxyFactory.sol',
//         'solmate/src/tokens/WETH.sol',
//       ],
//     }
// }

