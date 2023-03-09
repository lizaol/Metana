import {React, useState, useEffect} from 'react'
// import {ethers} from 'ethers'
import styles from './Wallet.module.css'
// import erc1155_abi from './Contracts/erc1155_abi.json'
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
  // const erc1155ContractAdress = '0xc70cB09A4f01303B9Fd1F539B84d22e61c00431e'
  const forgeContractAddress = '0x788183c4eae40A37e175290023450b05Ef05e99F'

  const [tokenName, setTokenName] = useState("Token")
  // setTokenName("new")    example
  const [connButtonText, setConnButtonText] = useState("Connect Wallet")
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaulAccount] = useState(null)
  const [balanceG, setBalanceG] = useState(null)       //balanceOf
  const [balanceS, setBalanceS] = useState(null)
  const [balanceE, setBalanceE] = useState(null)       //balanceOf
  // const [balance, setBalance] = useState([])      //balanceOfBatch
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(forgeContractAddress)

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
    getUserBalance(newAddress)
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum) //read only
    let tempSigner = tempProvider.getSigner() //read and write
    // let temp1155Contract = new ethers.Contract(erc1155ContractAdress, erc1155_abi, tempSigner)
    let tempForgeContract = new ethers.Contract(forgeContractAddress, forge_abi, tempSigner)
    //
    setProvider(tempProvider)
    setSigner(tempSigner)
    setContract(tempForgeContract)
  }

  // runs every time a component renders, and inside [what updates]
  useEffect(() => {
		if (contract != null) {
			updateBalanceGold();
      updateBalanceSilver();
      // updateBalanceE();
			updateTokenName();
		}
	}, [contract]);

  const updateBalanceGold = async () => {
    let balanceWei = await contract.balanceOfGold()
    let balanceNumG = balanceWei.toNumber()
    setBalanceG(balanceNumG)
  }

  const updateBalanceSilver = async () => {
    let balanceWei = await contract.balanceOfSilver()
    let balanceNum = balanceWei.toNumber()
    setBalanceS(balanceNum)
  }

  // const updateBalanceE = async() => {
  //   let balanceWei = await contract.balance()
  //   let balanceNum = balanceWei.toNumber()
  //   setBalanceE(balanceNum)
  // }

  // const getUserBalance = (address) => {
  //   window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
  //   .then(balanceE => {
  //     setBalanceE(ethersBalance)
  //   })
  // }

  const getUserBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setBalanceE(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

  const updateTokenName = async () => {
    setTokenName(await contract.name())
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
          <h3>{tokenName} Gold Balance: {balanceG} </h3>
        </div>
        <div>
          <h3>{tokenName} Silver Balance: {balanceS} </h3>
        </div>
        <div>
          <h3>Eth Balance: {balanceE} </h3>
        </div>
        {errorMessage}
        </div>
    </div>
  );
}
export default Wallet;
