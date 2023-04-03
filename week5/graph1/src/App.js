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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [-1000, -750, -500, 500, 600, 750, 1000],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [-900, -650, -300, 300, 400, 650, 800],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function App() {
  // Optional config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: process.env.MY_PRIVATE_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  // const [latestBlockNumber, setLatestBlockNumber] = useState()
  // const [alchemy, setAlchemy] = useState()
  // // const [data, setData] = useState({ labels: [""], datasets: [] })
  // const [data, setData] = useState({})

  // setData(data)
  // useEffect(() => {
  //   const alchemy = new Alchemy(settings);
  //   setAlchemy(alchemy)
  //   let ignore = false
  //   const latestBlockNumber = async () => {
  //     // Get and set the latest block number for the first time
  //     const latestBlock = await alchemy.core.getBlockNumber()

  //     if (!ignore) {
  //       setLatestBlockNumber(latestBlock)

  //       // Subscribe to new blocks, or newHeads
  //       alchemy.ws.on('block', blockNumber => {
  //         setLatestBlockNumber(blockNumber)
  //         console.log(blockNumber)
  //       })
  //     }
  //   }

  //   latestBlockNumber()

  //   return () => {
  //     ignore = true
  //     alchemy.ws.removeAllListeners()
  //   }
  //   // // Subscription for new blocks on Eth Mainnet.
  //   // alchemy.ws.on("block", async (blockNumber) => {
  //   //   // console.log("The latest block number is", blockNumber)
  //   //   const block = await alchemy.core.getBlock(blockNumber)
  //   //   setData(data.labels.push(blockNumber))
  //   //   setData(data.datasets.push(block.transactions.length))
  //   // }
  //   // );
  // }, [])

  return (
    <div>
      <Line options={options} data={data} />
    </div>
    // <div>{latestBlockNumber}</div>
  );
}
