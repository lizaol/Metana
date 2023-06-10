//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Deployer {
  bytes contractBytecode = hex"6060604052341561000f57600080fd5b6101858061001e6000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461005157806308e0d29d14610082575b600080fd5b341561005c57600080fd5b6100646100bb565b60405180826000191660001916815260200191505060405180910390f35b341561008d57600080fd5b6100b9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100e3565b005b60007f736d617278000000000000000000000000000000000000000000000000000000905090565b8073ffffffffffffffffffffffffffffffffffffffff1663380c7a676040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b151561014657600080fd5b5af1151561015357600080fd5b505050505600a165627a7a7230582076b3a8a6f48560ce9ec5cd02ae8caf7198cf99ca16072d46b5be23d9434b61ea0029";
 
  function deploy(bytes32 salt) public {
    bytes memory bytecode = contractBytecode;
    address addr;
      
    assembly {
      addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt) // value, bytecode location, salt
    }
  }
}