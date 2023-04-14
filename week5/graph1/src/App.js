// this code has variativity of how to setVolume

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
  
  const [latestBlockNumber, setLatestBlockNumber] = useState([])
  const [alchemy, setAlchemy] = useState()
  const [data, setData] = useState({ labels: [""], datasets: [{data: []}] })
  const [volume, setVolume] = useState([])

  // setData(data)
  useEffect(() => {
    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy)
    let ignore = false
    const latestBlockNumber = async () => {
      // Get and set the latest block number for the first time
      const latestBlock = await alchemy.core.getBlockNumber()

      if (!ignore) {
        // setLatestBlockNumber(latestBlock)
        // Subscribe to new blocks, or newHeads
        alchemy.ws.on('block', blockNumber => {
          const newLabel = blockNumber.toString();
          alchemy.core
            .getLogs({
                address: usdtAdr,
                topics: [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",     //topic hash of the ERC-20 Transfer event
                ],
                fromBlock: blockNumber - 1,
                toBlock: "latest",
            })
            .then(logs => {
              const sum1 = logs.reduce((acc, log) => acc + parseInt(log.data, 16), 0); //acc-accumulator, 0-init value
              // setVolume(sum);
              setData(prevData => ({
                labels: [...prevData.labels, newLabel],
                datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data, sum1]}]
              }))
            });
            // .then(logs => {
            //   const data = logs.map(log => parseInt(log.data, 16)).join(',');
            //   setVolume(data);
            // });
            // .then(logs => {
            //   const newVolume = []
            //   logs.forEach(log => {
            //     newVolume.push(parseInt(log.data, 16))
            //   })
            //   setVolume(prevVol => ([...prevVol, ...newVolume]))
            // })
            // .then(logs => logs.map(log => setVolume(prevVol => ([...prevVol, log.data]))))
          

          // const newLabel = blockNumber.toString();
          // const newDataset = blockNumber;
          // setData(prevData => ({        // this outputs [{"data":[]},{"data":[16979178, 16979179, 16979180]}]
          //   labels: [...prevData.labels, newLabel],
          //   datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data, newDataset]}]
          // }));
          
        })
      }
    }

    latestBlockNumber()


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
     
      <div>
         volume: {volume}
      </div>
      
    </div>
  );
}