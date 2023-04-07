import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Alchemy, Network } from "alchemy-sdk";
const usdtAdr = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
// const contractABI = require("./abi.json");
// export const usdt = new web3.eth.Contract(
//   contractABI,
//   usdtAdr
// );
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export function App() {
  // Optional config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: process.env.MY_PRIVATE_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  
  const [latestBlockNumber, setLatestBlockNumber] = useState()
  const [alchemy, setAlchemy] = useState()
  const [data, setData] = useState({ labels: [""], datasets: [{data: []}] })
  const [volume, setVolume] = useState([])
  useEffect(() => {
    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy)
    let ignore = false
    const latestBlockNumber = async () => {
      // Get and set the latest block number for the first time
      // const latestBlock = await alchemy.core.getBlockNumber()
      // setLatestBlockNumber(latestBlock)
      if (!ignore) {
        // setLatestBlockNumber(latestBlock)
        // Subscribe to new blocks, or newHeads
        alchemy.ws.on('block', blockNumber => {
          const newLabel = blockNumber.toString();
          const newDataset = blockNumber;
          logsListener(blockNumber)
          // alchemy.core
          //   .getLogs({
          //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          //     topics: [
          //       "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          //     ],
          //     fromBlock: blockNumber - 10,
          //     toBlock: "latest",
          //   })
          //   .then(logs => logs.map(log => setVolume(prevVol => ([...prevVol, log.data]))))

          setLatestBlockNumber(blockNumber)
          setData(prevData => ({        // this outputs [{"data":[]},{"data":[16979178, 16979179, 16979180]}]
            labels: [...prevData.labels, newLabel],
            datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data, newDataset]}]
          }));
          
        })
      }
    }

    latestBlockNumber()

    const logsListener = async (_blockNumber) =>{
    const latestBlock = await alchemy.core.getBlockNumber()
    await alchemy.core
      .getLogs({
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        topics: [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        ],
        fromBlock: _blockNumber - 1,
        toBlock: "latest",
      })
      .then(logs => logs.map(log => setVolume(prevVol => ([...prevVol, log.data]))))
      // .then(logs => logs.map(log => setVolume(prevVol => ([...prevVol, parseInt(log.data, 16)]))))
      // .then(console.log);

      // log.forEach((entry) => {
      //   const data = parseInt(entry.data, 16);
      //   console.log(data);
      // });
    }

  //   // setVolume(log.result[0].data)
    

    // logsListener()
    return () => {
      ignore = true
      alchemy.ws.removeAllListeners()
    }

  }, [])

  return (
    <div>
      {/* <Line options={options} data={data} /> */}
      datasets: {JSON.stringify(data.datasets)} 
        
      lables: {JSON.stringify(data.labels)}   
      {/* {latestBlockNumber} */}
      {/* <ul>
        {data.labels.map((label, index) => (
          <li key={index}>{label}</li>
        ))}
      </ul> */}
      <div> 
        Volume: {volume}
        Latest block: {latestBlockNumber}
      </div>
    </div>
  );
}
