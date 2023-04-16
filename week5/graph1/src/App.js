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
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';
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
  BarElement,
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
      text: "USDT Transfer Volume",
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
      text: "Base Fee",
    },
  },
  // scales: {
  //   yAxes: [
  //     {
  //       ticks: {
  //         beginAtZero: true,
  //         callback: function (value) {
  //           return value + ' GWei';
  //         },
  //       },
  //     },
  //   ],
  // },
  
};
const optionsGas = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "gasUsed / gasLimit",
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
  const [data, setData] = useState({ labels: [], datasets: [{label: "USDT", data: [], backgroundColor: 'rgba(99, 141, 255)'}] })
  const [baseFee, setBaseFee] = useState({ labels: [], datasets: [{label: "BASEFEE", data: [], borderColor: 'rgb(199, 8, 18)', backgroundColor: 'rgba(222, 95, 102)'}] });
  const [gasRatio, setGasRatio] = useState({ labels: [], datasets: [{label: "gasUsedRatio", data: [], borderColor: 'rgb(66, 168, 3)', backgroundColor: 'rgba(161, 237, 114)'}] });
  // const [volume, setVolume] = useState([])
  // const [gas, setGas] = useState([])
  // const [fee, setFee] = useState([])
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
            .then(async(logs) => {
              const sum1 = logs.reduce((acc, log) => acc + parseInt(log.data, 16) / 1e7, 0); //acc-accumulator, 0-init value
              // setVolume(sum);
              console.log("logs: ", logs)
              console.log("TransactionReceipt: ", await alchemy.core.getTransactionReceipt(logs[0].transactionHash))
              setData(prevData => ({
                labels: [...prevData.labels.slice(-9), newLabel.slice()],
                datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-9), sum1]}]
              }))
              getBaseFee(newLabel)
              getGasRatio(newLabel)
            
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
      const baseFeePerGasInt = res.baseFeePerGas.map(value => parseInt(value, 16) / 1e9);
      // setFee(baseFeePerGasInt)
      console.log(baseFeePerGasInt)
      setBaseFee(prevData => ({
        labels: [...prevData.labels.slice(-9), newLabel.slice()],
        datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-9), baseFeePerGasInt]}]
      }))
    }

    const getGasRatio = async(newLabel) => {
      const res =await alchemy.core.send('eth_feeHistory', [
        '0x9',
        'latest',
        []
      ]);
      const gas = res.gasUsedRatio.map(value => value * 100)
      console.log("gasUsedRatio", gas)
      // setGas(res.gasUsedRatio)
      setGasRatio(prevData => ({
        labels: [...prevData.labels.slice(-9), newLabel.slice()],
        datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-9), gas]}]
      }))
    }
    latestBlockNumber()


    return () => {
      ignore = true
      alchemy.ws.removeAllListeners()
    }
  }, [])

  return (
    <div>
      <div style={{ width: '65%', margin: '0 auto', marginBottom: '70px' }}>
        <Bar options={optionsVolume} data={data} />
      </div>

      <div style={{ width: '65%', margin: '0 auto', marginBottom: '70px' }}>
        <Line options={optionsFee} data={baseFee} />
      </div>

      <div style={{ width: '65%', margin: '0 auto', marginBottom: '70px' }}>
        <Line options={optionsGas} data={gasRatio} />
      </div>

    </div>
  );
}