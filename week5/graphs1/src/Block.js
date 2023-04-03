import { React, useState, useEffect } from "react";
import usdt_abi from "./abi/usdt_abi.json";
const ethers = require("ethers");
const usdtAdress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const Block = () => {
  //   const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  //   const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaulAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(usdtAdress);
  const [logs, setLogs] = useState(null);
  const [blockNumber, setBlockNumber] = useState();
  const [value, setValue] = useState();

  async function getBlock() {
    try {
      const block = await provider.getBlockNumber();
      setBlockNumber(block);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
    const contract = new ethers.Contract(usdtAdress, usdt_abi, provider);
    setContract(contract);

    if (contract != null) {
      getBlock();
      getLogs();
    }
  }, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

  const getLogs = async () => {
    // const transferFilter = contract.filters.Transfer(null, null, null);
    // const transfers = await contract.queryFilter(transferFilter, 'latest', 'latest-10');
    // totalVolume()
    // const latestBlockNumber = blockNumber
    // const fromBlockNumber = latestBlockNumber - 9; // Latest 10 blocks
    // let value = await contract.queryFilter('Transfer', latestBlockNumber, latestBlockNumber);
    const block = await provider.getBlockNumber();

    const transferEvents = await contract.queryFilter(
      "Transfer",
      block - 1,
      block
    );
    console.log(transferEvents);
    setLogs(transferEvents);
    //     const transferEvents = await contract.queryFilter(
    //         contract.filters.Transfer(),
    //         fromBlockNumber,
    //         latestBlockNumber
    //     );
    //     const transferVolumes = {};

    // transferEvents.forEach(event => {
    //     const from = event.args.from;
    //     const to = event.args.to;
    //     const value = event.args.value;

    //     if (transferVolumes[from]) {
    //         transferVolumes[from] -= value;
    //     } else {
    //         transferVolumes[from] = -value;
    //     }

    //     if (transferVolumes[to]) {
    //         transferVolumes[to] += value;
    //     } else {
    //         transferVolumes[to] = value;
    //     }
    // });
    // setValue(value.data)
  };

  return (
    <div>
      <h2> {usdtAdress}</h2>
      hi
      {blockNumber}
      <div>{value}</div>
    </div>
  );
};
export default Block;
