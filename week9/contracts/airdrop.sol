// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import "./merkleToken.sol";

contract airDrop {
    using BitMaps for BitMaps.BitMap;
    MerkleToken token;
    bytes32 public immutable root;
    uint public immutable rewardAmount;
    BitMaps.BitMap private claimed;

    constructor(bytes32 _root, uint _amount, address _token){
        root = _root;
        rewardAmount = _amount;
        token = MerkleToken(_token);
    }
    
    function claim(bytes32[] calldata proof, uint id, string memory secret) external{
        // require();
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, root, leaf), "Incorrect merkle proof");
        token.reveal(id, secret);
    }
}