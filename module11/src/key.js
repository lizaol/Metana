const EC = require('elliptic').ec;
const keccak256 = require('keccak256');
const Web3 = require("web3");
const Transaction = require('ethereumjs-tx').Transaction;

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
// getAddress()
const { privateKey, publicKey, address } = getAddress();

async function getNonce(address){
    try {
        const nonce = await web3.eth.getTransactionCount(address);
        console.log('nonce', nonce)
        return nonce;
      } catch (error) {
        console.error('Error retrieving nonce:', error);
      }
}



async function createTransaction(privateKey, address){
  const privateKey = privateKey   //Buffer.from('PRIVATE_KEY', 'hex');
  const senderAddress = address;
  const recipientAddress = '0x2a76087f400e15D71392ca7cFb9269fC6833e790';
  const value = '1000000000000000000';  // 1 eth
  const gasPrice = 'GAS_PRICE_IN_WEI';
  const gasLimit = 'GAS_LIMIT';
  const nonce = getNonce(address);

  const tx = new Transaction(
    {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      to: recipientAddress,
      value: value,
      data: '',
    },
    // { chain: '???' } 
  );
}

createTransaction(privateKey, address)