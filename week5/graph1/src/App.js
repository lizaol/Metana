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

const optionsVolume = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "USDT transfer volume",
    },
  },
};
const optionsFee = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "USDT base fee",
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
  const [data, setData] = useState({ labels: [], datasets: [{data: []}] })
  const [baseFee, setBaseFee] = useState({ labels: [], datasets: [{data: []}] });
  const [volume, setVolume] = useState([])
  const [fee, setFee] = useState([])
  // setData(data)
  useEffect(() => {
    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy)
    let ignore = false
   
    // this doesn't preload
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
                fromBlock: blockNumber - 9,
                toBlock: "latest",
            })
            .then(logs => {
              const sum1 = logs.reduce((acc, log) => acc + parseInt(log.data, 16), 0); //acc-accumulator, 0-init value
              // setVolume(sum);
              setData(prevData => ({
                labels: [...prevData.labels.slice(-9), newLabel.slice()],
                datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-9), sum1]}]
              }))
              getBaseFee(newLabel)
            
            });
          
        })
      }

    }
    const getBaseFee = async (newLabel) => {
      const res =await alchemy.core.send('eth_feeHistory', [
        '0x9',
        'latest',
        []
      ]);
      const baseFeePerGasInt = res.baseFeePerGas.map(value => parseInt(value, 16));
      setFee(baseFeePerGasInt)
      console.log(baseFeePerGasInt)
      setBaseFee(prevData => ({
        labels: [...prevData.labels.slice(-9), newLabel.slice()],
        datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-9), ...baseFeePerGasInt]}]
      }))
    }
    latestBlockNumber()
    // getBaseFee()

    return () => {
      ignore = true
      alchemy.ws.removeAllListeners()
    }
  }, [])

  return (
    <div>
      <Line options={optionsVolume} data={data} />
      datasets: {JSON.stringify(data.datasets)} 
      <div>
        lables: {JSON.stringify(data.labels)} 
      </div>

      <div>
        <Line options={optionsFee} data={baseFee} />
      </div>
      <div>basefee: {fee}</div>
      {/* {latestBlockNumber} */}
     

      
    </div>
  );
}