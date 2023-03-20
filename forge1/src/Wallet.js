import {React, useState, useEffect} from 'react'
// import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import erc1155_abi from './Contracts/erc1155_abi.json'
// import forge_abi from './Contracts/forge_abi.json'
import Interactions from './Interactions';
// import { POSClient, use } from "@maticnetwork/maticjs"
// import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
// import HDWalletProvider from "@truffle/hdwallet-provider"

// use(Web3ClientPlugin)
const ethers = require("ethers")
// var HDWalletProvider = require("@truffle/hdwallet-provider");

const Wallet = () => {
// ethrscan addresses
  const erc1155ContractAdress = '0xeb1053369B8660a27D96Cabe54e72395aAa0385c'
  const forgeContractAddress = '0x788183c4eae40A37e175290023450b05Ef05e99F'

  const [tokenName, setTokenName] = useState("ERC1155 Token")
  const [connButtonText, setConnButtonText] = useState("Connect Wallet")
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaulAccount] = useState(null)
  const [balanceE, setBalanceE] = useState(null)       //balanceOf
  const [balance, setBalance] = useState()      //balanceOfBatch
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(erc1155ContractAdress)
  const [data, setData] = useState(null)
  const [mintName, setMint] = useState(false)

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
    let temp1155Contract = new ethers.Contract(erc1155ContractAdress, erc1155_abi, tempSigner)
    // let tempForgeContract = new ethers.Contract(tempForgeContract, forge_abi, tempSigner)
    //
    setProvider(tempProvider)
    setSigner(tempSigner)
    setContract(temp1155Contract)
  }

  // runs every time a component renders, and inside [what updates]
  useEffect(() => {
		if (contract != null) {
			updateBalanceBatch();
		}
	}, [contract]);

  const updateBalanceBatch = async () => {
    let addresses = [defaultAccount, defaultAccount, defaultAccount, defaultAccount, defaultAccount, defaultAccount, defaultAccount]
    let ids = [0, 1, 2, 3, 4, 5, 6]
    let balanceWei = await contract.balanceOfBatch(addresses, ids)
    var array = [];
    for(var i=0;i<balanceWei.length;i++){
        array.push(balanceWei[i].toString());
    }
    const arr = [ {n: "Gold", id: array[0]},
                  {n: "Silver", id: array[1]},
                  {n: "Thor's Hammer", id: array[2]},
                  {n: "Sword", id: array[3]},
                  {n: "Shield", id: array[4]},
                  {n: "Loki's Horns", id: array[5]},
                  {n: "Potion", id: array[6],} ]
    console.log(arr)
    setBalance(arr)
  }


  const getUserBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setBalanceE(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

  const getData = (val) => {
    setData(val.target.value)
  }
  const mintHandler = async () => {
    // arr = {}
    if (data == 1){
      contract.mint(defaultAccount, 0, 1).send();

      // setBalance(await contract.balanceOf(defaultAccount, 0))
    } else if (data == 2){
      contract.mint(defaultAccount, 1, 1).send();
    } else if (data == 3){
      contract.mint(defaultAccount, 2, 1).send();
    } else if (data == 4){
      contract.mint(defaultAccount, 3, 1).send();
    } else if (data == 5){
      contract.mint(defaultAccount, 4, 1).send();
    } else if (data == 6){
      contract.mint(defaultAccount, 5, 1).send();
    } else if (data == 7){
      contract.mint(defaultAccount, 6, 1).send();
    }
  }

return (
    <div>
      <h2> {tokenName}</h2>
      <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
      <div className= {styles.walletCard}>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>
        <div>
          <h3>Eth Balance: {balanceE} </h3>
        </div>
        <div>
          <h3>Batch Balance:
            <ol>
          {balance?.map(function(d, id){
             return (<li key={id}>{d.n} {d.id} </li>)
           })}
            </ol>
          </h3>
        </div>
        {errorMessage}
        </div>
        <div>
         <input type="text" onChange={getData}/>
        </div>
        <button className={styles.button5} onClick={mintHandler}> Mint</button>
    </div>
  );
}
export default Wallet;
