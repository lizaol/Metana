// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import "./merkle.sol";

contract airDrop {
    using BitMaps for BitMaps.BitMap;
    Merkle token;
    bytes32 public immutable root;
    uint public immutable rewardAmount;
    BitMaps.BitMap private claimed;

    constructor(bytes32 _root, uint _amount, address _token){
        root = _root;
        rewardAmount = _amount;
        token = Merkle(_token);
    }
    
    function claim(bytes32[] calldata proof, uint id, string memory secret) external{
        require();
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, root, leaf), "Incorrect merkle proof");
        token.reveal(id, secret);
    }
}