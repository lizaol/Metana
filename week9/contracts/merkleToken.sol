// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";


contract MerkleToken is ERC721, Ownable, Multicall {
    using BitMaps for BitMaps.BitMap;
    
    MerkleToken token;
    bytes32 public immutable root;
    uint public immutable rewardAmount;
    BitMaps.BitMap private claimed;
    struct Id{
        bytes32 hash;
        uint blockNum;
        // bool revealed;
    }
    mapping(address => Id) public commits;
    mapping(address => bool) public hasMinted;

    constructor(bytes32 _root, uint _amount) ERC721("Merkle", "MER") {
        root = _root;
        rewardAmount = _amount;
    }

    function transferMultipleNFT(uint256[] memory tokenIds, address[] memory to) public {
        require(msg.sender == );
    }

    // commit to a value while keeping it hidden with the ability to reveal it later
    function submitCommit(uint number, string memory secret) public {
        bytes32 numHash = bytes32(keccak256(abi.encodePacked(number, secret)));
        require(commits[msg.sender].hash != numHash, "Commitment already submitted");
        commits[msg.sender] = Id(numHash, block.number);
    }

    function reveal(uint number, string memory secret) public {
        Id storage commit = commits[msg.sender];
        // require(!commit.revealed, "Already revealed");
        require(!hasMinted[msg.sender], "Already revealed");
        require(commit.hash == keccak256(abi.encodePacked(number, secret)), "Invalid reveal");
        require(block.number > commit.blockNum + 10, "Reveal too early");
        uint tokenId = uint256(keccak256(abi.encodePacked(number, secret, blockhash(commit.blockNum + 10))));
        hasMinted[msg.sender] = true;
        _safeMint(msg.sender, tokenId);
    }

}
 