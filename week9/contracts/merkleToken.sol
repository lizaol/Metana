// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MerkleToken is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    struct Id{
        bytes32 hash;
        uint blockNum;
        // bool revealed;
    }
    mapping(address => Id) public commits;
    mapping(address => bool) public minted;

    constructor() ERC721("Merkle", "MER") {}

    // function safeMint(address to) private onlyOwner {
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    // }

    // commit to a value while keeping it hidden with the ability to reveal it later
    function submitCommit(uint number, string memory secret) public {
        bytes32 numHash = bytes32(keccak256(abi.encodePacked(number, secret)));
        require(commits[msg.sender].hash != numHash, "Commitment already submitted");
        commits[msg.sender] = Id(numHash, block.number);
    }

    function reveal(uint number, string memory secret) public {
        Id storage commit = commits[msg.sender];
        // require(!commit.revealed, "Already revealed");
        require(!minted[msg.sender], "Already revealed");
        require(commit.hash == keccak256(abi.encodePacked(number, secret)), "Invalid reveal");
        require(block.number > commit.blockNum + 10, "Reveal too early");
        uint tokenId = uint256(keccak256(abi.encodePacked(number, secret, blockhash(commit.blockNum + 10))));
        minted[msg.sender] = true;
        _safeMint(msg.sender, tokenId);
    }

}
 