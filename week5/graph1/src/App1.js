// this code has output doubled

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
          // const newDataset = [ {data:[blockNumber]} ];
          // logsListener(blockNumber)
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
            datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data, blockNumber]}]
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
        {/* Volume: {volume}
        Latest block: {latestBlockNumber} */}
      </div>
    </div>
  );
}







// this code has possible preload data but with putput doubled

useEffect(() => {
  const alchemy = new Alchemy(settings);
  setAlchemy(alchemy)
  let ignore = false
  const latestBlockNumber = async () => {
    const latestBlock = await alchemy.core.getBlockNumber()
    // Get and set the latest block number for the first time
  // const latestBlock = await alchemy.core.getBlockNumber()

    // if (!ignore) {
      // setLatestBlockNumber(latestBlock)
      // alchemy.core.getBlockNumber().then((blockNumber) => {
      //   setLatestBlockNumber(blockNumber);
      //   preloadData(blockNumber - 9, blockNumber);
      //   subscribeToBlocks(blockNumber);
      // });

      //    initial
          // const logs = await alchemy.core.getLogs({
          //   address: usdtAdr,
          //   topics: [
          //     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          //   ],
          //   fromBlock: latestBlock - 9,
          //   toBlock: "latest",
          // })
          // // initial data to upload in screen before starting listeting to events
          // const initialData = logs.reduce((acc, log) => {
          //   const label = log.blockNumber.toString()
          //   const int = parseInt(log.data, 16)
          //   return {    //  value that will be returned by the reduce method and assigned to initialData
          //     labels: [...acc.labels, label],
          //     datasets: [{ ...acc.datasets[0], data: [...acc.datasets[0].data, int] }],
          //   }
          // }, { labels: [], datasets: [{ data: [] }] })   // initialization of acc
          
          // // Set the initial data
          // setData(initialData)
      // Subscribe to new blocks, or newHeads
    // const subscribeToBlocks = (latestBlock) => {

    //   alchemy.ws.on('block', blockNumber => {
    //     const newLabel = blockNumber.toString();
    //     alchemy.core
    //       .getLogs({
    //           address: usdtAdr,
    //           topics: [
    //           "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",     //topic hash of the ERC-20 Transfer event
    //           ],
    //           fromBlock: blockNumber - 9,
    //           toBlock: "latest",
    //       })
    //       .then(logs => {
    //         const sum1 = logs.reduce((acc, log) => acc + parseInt(log.data, 16), 0); //acc-accumulator, 0-init value
    //         // setVolume(sum);
    //         setData(prevData => ({
    //           labels: [...prevData.labels.slice(-2), newLabel.slice()],
    //           datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-2), sum1]}]
    //         }))
    //       });
        
    //   })
    // }

    // const preloadData = async (fromBlock, toBlock) => {
    //   const logs = await alchemy.core.getLogs({
    //     address: usdtAdr,
    //     topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],
    //     fromBlock,
    //     toBlock,
    //   });
    //   const data = logs.map((log) => parseInt(log.data, 16));
    //   const labels = logs.map((log) => log.blockNumber.toString());
    //   setData({
    //     labels,
    //     datasets: [{ data }],
    //   });
    // };
  // }
  // this doesn't preload
  if (!ignore) {
  // const latestBlockNumber = async () => {
    // Get and set the latest block number for the first time
    const latestBlock = await alchemy.core.getBlockNumber()

    
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
              labels: [...prevData.labels.slice(-2), newLabel.slice()],
              datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(-2), sum1]}]
            }))
          });
        
      })
    }
  

  latestBlockNumber()

}

  return () => {
    ignore = true
    alchemy.ws.removeAllListeners()
  }
}, [])






















// this code has basefee 
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

      console.log(res)
      setBaseFee(prevData => ({
        labels: [...prevData.labels, newLabel],
        datasets: [{...prevData.datasets[0], data: [...prevData.datasets[0].data, ...baseFeePerGasInt]}]
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
        
      {/* {latestBlockNumber} */}
     

      
    </div>
  );
}