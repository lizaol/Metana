// import { React, useState, useEffect } from "react";
//
// const { Network, Alchemy } = require("alchemy-sdk");
// // require("dotenv").config();
// const settings = {
//   apiKey: "P81QrN3eZ1uHBqpykX9mwQxRljgJWBRA",
//   network: Network.ETH_MAINNET,
// };

// import { AlchemyWeb3 } from "@alch/alchemy-web3";
import { useState, useEffect } from "react";
import { AlchemyWeb3 } from "@alch/alchemy-web3";

const settings = {
  apiKey: "P81QrN3eZ1uHBqpykX9mwQxRljgJWBRA",
  chainId: 1, // Mainnet chain ID
};

function Block() {
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    const web3 = new AlchemyWeb3(settings.apiKey);
    web3.eth.getBlockNumber().then((number) => {
      setBlockNumber(number);
    });
  }, []);

  return <div>{blockNumber}</div>;
}

export default Block;

// function Block() {
//   const [blockNumber, setBlockNumber] = useState(null);
//
//   useEffect(async () => {
//     const alchemy = new Alchemy(settings);
//     await alchemy.core.getBlockNumber().then((number) => {
//       setBlockNumber(number);
//     });
//   }, []);
//
//   return (
//     <div>
//       {blockNumber}
//
//
//     </div>
//   );
// }
//
// export default Block;

// const Block = () => {
//   const [blockNumber, setBlockNumber] = useState();
//   useEffect( async () => {
//     const latestBlock = await alchemy.core.getBlockNumber();
//     setBlockNumber(latestBlock);
//   }, []);
//
//     return (
//         <div>
//           Hi{blockNumber}
//         </div>
//     );
// };
// export default Block;
