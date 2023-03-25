import React, { useState, useEffect } from "react";
import usdt_abi from "./abi/usdt_abi.json";
import { ethers } from "ethers";

const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

function Block() {
  const [blockNumber, setBlockNumber] = useState(0);
  const [value, setValue] = useState(0);
  const [logs, setLogs] = useState(null);
  const [transferVolumes, setTransferVolumes] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/772d58498d2e44f48fd34722115728dc");
    const usdt = new ethers.Contract(usdtAddress, usdt_abi, provider);

    async function fetchTransferVolumes() {
        const latestBlockNumber = await provider.getBlockNumber();
        setBlockNumber(latestBlockNumber)
        const transferVolumes = [];
  
        for (let i = latestBlockNumber - 100; i <= latestBlockNumber; i++) {
          const filter = usdt.filters.Transfer(null, null);
          filter.fromBlock = i;
          filter.toBlock = latestBlockNumber;
  
          const transfers = await usdt.queryFilter(filter);
          const transferVolume = transfers.reduce(
            (acc, transfer) => acc.add(transfer.args.value),
            ethers.BigNumber.from(0)
          );
  
          transferVolumes.push({ blockNumber: i, transferVolume });
        }
  
        setTransferVolumes(transferVolumes);
      }
  

    fetchTransferVolumes();



  }, []);

  return (
    <div>
      <h2>{usdtAddress}</h2>
      <div>Block number: {blockNumber}</div>
      <div><h1>USDT Transfer Volumes for Latest 10 Blocks</h1>
      <table>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Transfer Volume</th>
          </tr>
        </thead>
        <tbody>
          {transferVolumes.map((transfer) => (
            <tr key={transfer.blockNumber}>
              <td>{transfer.blockNumber}</td>
              <td>{ethers.utils.formatUnits(transfer.transferVolume)}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}

export default Block;
