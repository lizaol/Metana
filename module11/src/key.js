const EC = require('elliptic').ec;
const { Common, Chain, Hardfork } = require('@ethereumjs/common')
const keccak256 = require('keccak256');
const Web3 = require("web3");
const {Transaction} = require('ethereumjs-tx')

// const { getDefaultHighWaterMark } = require('stream');
// Connect to Ganache
const web3 = new Web3('HTTP://127.0.0.1:7545'); 
// Create a new instance of the elliptic curve (secp256k1)
const ec = new EC('secp256k1');

// Generate a new key pair
function getAddress(){
    const key = ec.genKeyPair();
    // Get the private/public key in hexadecimal format
    const privateKey = key.getPrivate('hex');
    const publicKey = key.getPublic('hex');
    const publicX = key.getPublic().x.toString(16)
    const publicY = key.getPublic().y.toString(16)
    console.log('Private Key:', privateKey, '\npublic Key:', publicKey, '\npublicX:', publicX, '\npublicY:', publicY);

    const address = '0x' + keccak256(Buffer.from(publicKey)).toString('hex').slice(-40)
    // const address = publicKeyToAddress(Buffer.from('04438392f0a25ec88d80737270f1fc775d2ef4915876caf6df587c5febda1a15ec765dec42ac1fce5c758d305e3e85d50655aca2e03b31ed3e7abbb89dd8936a59'))
    console.log("Address", address)
    return { privateKey, publicKey, address }
}
const { privateKey, publicKey, address } = getAddress();

async function getNonce(address){
    try {
        const nonce = await web3.eth.getTransactionCount(address);
        const nonceHex = web3.utils.toHex(nonce);
        console.log('Nonce (hex):', nonceHex);
        console.log('nonce', nonce)
        return nonceHex;
      } catch (error) {
        console.error('Error retrieving nonce:', error);
      }
}

// async function getGas(address){
//   const ganacheUrl = 'HTTP://127.0.0.1:7545'; 

// const senderAddress = address;
// const recipientAddress = '0x78A89bcE9DB5871F0cD6d68bc2BC8492e653b624';
// const value = '1000000000000000000';

// const requestData = {
//   method: 'eth_estimateGas',
//   params: [
//     {
//       from: senderAddress,
//       to: recipientAddress,
//       value: value,
//     },
//   ],
//   jsonrpc: '2.0',
//   id: 1,
// };

// // Send the request to the Ganache instance
// fetch(ganacheUrl, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(requestData),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.error) {
//       console.error('Error estimating gas:', data.error.message);
//     } else {
//       const estimatedGas = parseInt(data.result);
//       console.log('Estimated gas:', estimatedGas);
//     }
//   })
//   .catch((error) => {
//     console.error('Error estimating gas:', error);
//   });

// }
// getGas(address)

async function getGasPrice() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const gasPriceHex = web3.utils.toHex(gasPrice);
    console.log('Gas Price (Hex):', gasPriceHex);
    console.log('Gas Price:', gasPrice);
    return gasPriceHex;
  } catch (error) {
    console.error('Error fetching gas price:', error);
  }
}
// getGasPrice();

async function createTransaction( address, valueInWei){
  // privateKey = privateKey   //Buffer.from('PRIVATE_KEY', 'hex');
  try{
    const senderAddress = address;
    const recipientAddress = '0x2a76087f400e15D71392ca7cFb9269fC6833e790';
    const value = '0x00' //valueInWei // 1 Ether;  
    const gasPrice = await getGasPrice();
    const gasLimit = 250000;
    const nonce = await getNonce(address);
    const chainId = 1377;   // ganache 

    // const txParams = {
    //   nonce: nonce,
    //   gasPrice: gasPrice,
    //   gasLimit: '0x3D090',    // 250000
    //   to: '0x78A89bcE9DB5871F0cD6d68bc2BC8492e653b624', // ganache 
    //   value: value,
    //   data: '',
    // }
    // const common = new Common({ chain: Chain.Mainnet, hardfork: Hardfork.Istanbul })
    // const tx = Transaction.fromTxData(txParams, { common });


    // const tx = new Transaction({
    //   nonce: nonce,
    //   gasPrice: gasPrice,
    //   gasLimit: '0x3D090',    // 250000
    //   to: '0x78A89bcE9DB5871F0cD6d68bc2BC8492e653b624', // ganache 
    //   value: value,
    //   data: '',
    // }, { chain: 'mainnet' });
    // const tx = new Transaction(txParams, { chain: 'mainnet' });

    const txParams = {
      nonce: '0x00',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    }
    
    const common = new Common({ chain: Chain.Mainnet })
    // const tx = Transaction.fromTxData(txParams, { common })
    const tx = new Transaction(txParams, { Common });
    const privateKey = Buffer.from(
      'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109',
      'hex'
    )
    tx.sign(privateKey)
    const serializedTx = tx.serialize();
    const rawTransaction = '0x' + serializedTx.toString('hex');

    // Submit the transaction to the Ethereum network
    const receipt = await web3.eth.sendSignedTransaction(rawTransaction);
    console.log('Transaction hash:', receipt.transactionHash);
    console.log('Gas used:', receipt.gasUsed);
    console.log('Transaction successful!');



  } catch (error) {
    console.error('Transaction failed:', error);
  }
}

createTransaction(privateKey, address)