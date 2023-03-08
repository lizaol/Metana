// import {React, useState, useEffect} from 'react'
// // import {ethers} from 'ethers'
// import styles from './Wallet.module.css'
// import simple_token_abi from './Contracts/simple_abi.json'
// import Interactions from './Interactions';
// const ethers = require("ethers")
// const Wallet = () => {
//
// 	// deploy simple token contract and paste deployed contract address here. This value is local ganache chain
// 	let contractAddress = '0x0210811B2d5A7293a00C12ee77Ae343FF845602C';
//
// 	const [errorMessage, setErrorMessage] = useState(null);
// 	const [defaultAccount, setDefaultAccount] = useState(null);
// 	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
//
// 	const [provider, setProvider] = useState(null);
// 	const [signer, setSigner] = useState(null);
// 	const [contract, setContract] = useState(null);
//
// 	const [tokenName, setTokenName] = useState("TokenBla");
// 	const [balance, setBalance] = useState(null);
// 	const [transferHash, setTransferHash] = useState(null);
//
//
//
// 	const connectWalletHandler = () => {
// 		if (window.ethereum && window.ethereum.isMetaMask) {
//
// 			window.ethereum.request({ method: 'eth_requestAccounts'})
// 			.then(result => {
// 				// accountChangedHandler(result[0]);
// 				setConnButtonText('Wallet Connected');
// 			})
// 			.catch(error => {
// 				setErrorMessage(error.message);
//
// 			});
//
// 		} else {
// 			console.log('Need to install MetaMask');
// 			setErrorMessage('Please install MetaMask browser extension to interact');
// 		}
// 	}
//
// 	// update account, will cause component re-render
// 	// const accountChangedHandler = (newAccount) => {
// 		// setDefaultAccount(newAccount);
// 		// updateEthers();
// 	// }
//
// 	// const updateBalance = async () => {
// 	// 	let balanceBigN = await contract.balanceOf(defaultAccount);
// 	// 	let balanceNumber = balanceBigN.toNumber();
//   //
// 	// 	let tokenDecimals = await contract.decimals();
//   //
// 	// 	let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);
//   //
// 	// 	// setBalance(toFixed(tokenBalance));
//   //   setBalance(tokenBalance)
//   //
// 	// }
//
// //    function toFixed(x) {
// //    if (Math.abs(x) < 1.0) {
// //       var e = parseInt(x.toString().split('e-')[1]);
// //       if (e) {
// //          x *= Math.pow(10, e - 1);
// //          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
// //       }
// //    } else {
// //       var e = parseInt(x.toString().split('+')[1]);
// //       if (e > 20) {
// //          e -= 20;
// //          x /= Math.pow(10, e);
// //          x += (new Array(e + 1)).join('0');
// //       }
// //    }
// //    return x;
// // }
//
// 	// const chainChangedHandler = () => {
// 	// 	// reload the page to avoid any errors with chain change mid use of application
// 	// 	window.location.reload();
// 	// }
//
// 	// listen for account changes
// 	// window.ethereum.on('accountsChanged', accountChangedHandler);
//
// 	// window.ethereum.on('chainChanged', chainChangedHandler);
//
// 	// const updateEthers = () => {
// 	// 	let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
// 	// 	setProvider(tempProvider);
//   //
// 	// 	let tempSigner = tempProvider.getSigner();
// 	// 	setSigner(tempSigner);
//   //
// 	// 	let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
// 	// 	setContract(tempContract);
// 	// }
//
// 	useEffect(() => {
// 		if (contract != null) {
// 			// updateBalance();
// 			updateTokenName();
// 		}
// 	}, [contract]);
//
// 	const updateTokenName = async () => {
// 		setTokenName(await contract.name());
// 	}
//
// 	return (
// 	<div>
// 			<h2> {tokenName + " ERC-20 Wallet"} </h2>
// 			<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
//
// 			<div className={styles.walletCard}>
// 			<div>
// 				<h3>Address: {defaultAccount}</h3>
// 			</div>
//
// 			<div>
// 				<h3>{tokenName} Balance: {balance}</h3>
// 			</div>
//
// 			{errorMessage}
// 		</div>
// 		// <Interactions contract = {contract}/>
// 	</div>
// 	)
// }
//
// export default Wallet;


// https://www.youtube.com/watch?v=ipKCKB3PCpk
import {React, useState, useEffect} from 'react'
// import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import erc1155_abi from './Contracts/erc1155_abi.json'
import forge_abi from './Contracts/forge_abi.json'
import Interactions from './Interactions';
// import { POSClient, use } from "@maticnetwork/maticjs"
// import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
// import HDWalletProvider from "@truffle/hdwallet-provider"

// use(Web3ClientPlugin)
const ethers = require("ethers")
// var HDWalletProvider = require("@truffle/hdwallet-provider");

const Wallet = () => {

// polygon addresses
  // const erc1155ContractAdress = '0xcF5B4d6681A3973F6fd9d213415c54fe35fa165a'
  // const forgeContractAddress = '0xC4c8493BbfCdC59dFD996C948E63e613e14956c4'

// ethrscan addresses
  const erc1155ContractAdress = '0x050899BF8EF9B818b6e5Bc389bbb830e3D2c4C6C'
  const forgeContractAddress = '0x114E62863BD106793fE1a1401369052aD5FC5658'

  const [tokenName, setTokenName] = useState("Token")
  // setTokenName("new")    example
  const [connButtonText, setConnButtonText] = useState("Connect Wallet")
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaulAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0])
        setConnButtonText('Wallet Connected')
      })
      .catch(error => {
        setErrorMessage(error.message)
      })

    } else {
      console.log('install metamask')
      setErrorMessage('install metamask')
    }
  }

  const accountChangedHandler = (newAddress) =>{
    setDefaulAccount(newAddress)
    updateEthers()
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum) //read only
    let tempSigner = tempProvider.getSigner() //read and write
    let temp1155Contract = new ethers.Contract(erc1155ContractAdress, erc1155_abi, tempSigner)
    // let tempForgeContract = new ethers.Contract(forgeContractAddress, forge_abi, tempSigner)
    //
    setProvider(tempProvider)
    setSigner(tempSigner)
    setContract(temp1155Contract)
  }

  // runs every time a component renders, and inside [what updates]
  useEffect(() => {
		if (contract != null) {
			// updateBalance();
			updateTokenName();
		}
	}, [contract]);

  // const updateBalance = async () => {
  //   let balanceWei = await contract.balanceOf(defaultAccount)
  //   let balanceNum = balanceWei.toNumber()
  //   let decimals = await contract.decimals()
  //   let tokenBalance = balanceNum / Math.pow(10, decimals)
  //   setBalance(tokenBalance)
  // }

  const updateTokenName = async () => {
    setTokenName(await contract.methods.name())
  }


return (
    <div>
      <h2> {tokenName}</h2>
      <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}></button>
      <div className= {styles.walletCard}>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>
        <div>
          <h3>{tokenName} Balance: {balance} </h3>
        </div>
        {errorMessage}
        </div>
    </div>
  );
}
export default Wallet;
