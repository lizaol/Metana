// import { React, useState, useEffect } from "react";
// import styles from "./Wallet.module.css";
// import { Network, Alchemy } from 'alchemy-sdk';
// const usdt_abi = require("./abi/usdt_abi.json");
import usdt_abi from "./Contracts/usdt_abi.json"
// const settings = {
//     apiKey: "jR6J6WYDuD2dVROsRNoH5V5QI9WIDmNm",
//     network: Network.ETH_GOERLI,
// };
// const alchemy = new Alchemy(settings);

ethers = require("ethers");
// require("dotenv").config();

// async function block(){
//   const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; 
//   const contract = new ethers.Contract(usdt_abi, usdtAddress);
//   alchemy.core.getBlockNumber().then(console.log);
// }
// block()

// const loadData = async () =>{
//   const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; 
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const contract = new ethers.Contract(usdt_abi, usdtAddress, provider);
// }
const Blocks = async() => {
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; 
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(usdt_abi, usdtAddress, provider);
  const block = await provider.getBlock()
  console.log(block)
  // async function readEvent(){

  // } 

  return (
    <div>
      usdcAddress
    </div>
  );

}

// // const Blocks = () => {
//     // const contract = new web3.eth.Contract(contractAbi, contractAddress);
//     let provider = new ethers.providers.Web3Provider(window.ethereum); //read only
//     // async function getTotalTransferVolume() {
//     //     const latestBlockNumber = await web3.eth.getBlockNumber();
//     //     let transferVolume = 0;
//     //     for (let i = latestBlockNumber; i > latestBlockNumber - BLOCKS_TO_CHECK; i--) {
//     //         const block = await web3.eth.getBlock(i, true); // true flag includes transaction details in the block
//     //         const transactions = block.transactions;
//     //         for (let j = 0; j < transactions.length; j++) {
//     //         const tx = transactions[j];
//     //         if (tx.to === TOKEN_ADDRESS) { // check if the transaction is a transfer to the token contract
//     //             const value = web3.utils.toBN(tx.value); // convert value to BigNumber for safe arithmetic
//     //             transferVolume += parseInt(value);
//     //         }
//     //         }
//     //     }

//     // return transferVolume;
//     // }

//     // getTotalTransferVolume().then((result) => {
//     // console.log(`Total transfer volume: ${result}`);
//     // }).catch((error) => {
//     // console.error(error);})

//     ethers.provider.getBlockNumber().then((latestBlockNumber) => {
//         // loop through the last 10 block numbers and get the logs for the ERC20 contract
//         for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {
//           web3.eth.getLogs({
//             fromBlock: i,
//             toBlock: i-1,
//             address: contractAddress,
//             topics: [web3.utils.sha3('Transfer(address,address,uint256)')]
//           }).then((logs) => {
//             console.log(`Logs for block ${i}:`);
//             console.log(logs);
//             console.log('---');
//           });
//         }
//     });


// // async function getTransfer(){
// //     const provider = new ethers.providers.WebSocketProvider(
// //         `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
// //     );

// //     const contract = new ethers.Contract(usdcAddress, ABI, provider);

// //     contract.on("Transfer", (from, to, value, event)=>{

// //         let transferEvent ={
// //             from: from,
// //             to: to,
// //             value: value,
// //             eventData: event,
// //         }

// //         console.log(JSON.stringify(transferEvent, null, 4))

// //     })
// // }

// // getTransfer() 
// // }
// // }
export default Blocks;





// // const ethers = require('ethers');

// // // Set up the provider to connect to the Ethereum network
// // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// // // Set up the contract object for the ERC20 token
// // const contractAddress = '0xA0Cc0CC82d945D96D4F481A62C968AfCCea1C54F'; // Replace with the actual token address
// // const contractAbi = ['function transfer(address to, uint256 value) returns (bool)'];
// // const tokenContract = new ethers.Contract(contractAddress, contractAbi, provider);

// // // Set up the filter to get ERC20 Transfer events
// // const filter = {
// //   address: contractAddress,
// //   fromBlock: 'latest',
// //   toBlock: 'latest',
// //   topics: [ethers.utils.id('Transfer(address,address,uint256)')]
// // };

// // // Get the latest block number
// // provider.getBlockNumber().then(async (latestBlockNumber) => {

// //   // Iterate over the last 10 blocks
// //   for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {

// //     // Get the block data for the current block
// //     const block = await provider.getBlockWithTransactions(i);

// //     // Sum up the value of transfers of the ERC20 token in the current block
// //     let tokenTransferVolume = 0;
// //     for (const transaction of block.transactions) {
// //       if (transaction.to === contractAddress) {
// //         const transferEvent = tokenContract.interface.parseLog(transaction);
// //         if (transferEvent && transferEvent.name === 'Transfer') {
// //           tokenTransferVolume += transferEvent.args[2].toNumber();
// //         }
// //       }
// //     }

// //     // Log the total volume of transfers of the ERC20 token in the current block
// //     console.log(`Block ${i}: ${tokenTransferVolume} tokens transferred`);
// //   }
// // });
