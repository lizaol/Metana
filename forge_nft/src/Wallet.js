// https://www.youtube.com/watch?v=ipKCKB3PCpk
import {React, useState, useEffect} from 'react'
// import {ethers} from 'ethers'
const ethers = require("ethers")
import styles from './Wallet.module.css'
import erc1155_abi from './Contracts/erc1155_abi.json'
import forge_abi from './Contracts/forge_abi.json'
import Interactions from './Interactions';

const Wallet = () => {

  // const erc1155ContractAdress = '0x03d580d83D19615652C9a9F0d7DAe6876c312307'
  const forgeContractAddress = '0xf4a4f798dE3043E53de425f3E2E36B185A9E7841'
  const [tokenName, setTokenName] = useState("Token")
  // setTokenName("new")
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
    // let temp1155Contract = new ethers.Contract(contractAddress, erc1155_abi, tempSigner)
    let tempForgeContract = new ethers.Contract(forgeContractAddress, forge_abi, tempSigner)

    setProvider(tempProvider)
    setSigner(tempSigner)
    setContract(tempForgeContract)
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
          <h3>{tokenName} Balance: {balance}</h3>
        </div>
        {errorMessage}
      </div>
    </div>
  );
}
export default Wallet;
