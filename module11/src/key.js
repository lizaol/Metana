const EC = require('elliptic').ec;
const keccak256 = require('keccak256')
// const publicKeyToAddress = require('ethereum-public-key-to-address')

// Create a new instance of the elliptic curve (secp256k1)
const ec = new EC('secp256k1');

// Generate a new key pair
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