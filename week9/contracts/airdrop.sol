// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
// import "@openzeppelin/contracts/utils/Multicall.sol";
import "@1001-digital/erc721-extensions/contracts/RandomlyAssigned.sol";

enum Stage{
        Presale,
        PublicSale,
        SupplyOut
    }

contract MerkleToken is RandomlyAssigned, ERC721, Ownable, PullPayment {
    bytes32 public immutable root;
    Stage public stage;

    struct Id{              
        bytes32 hash;
        uint blockNum;
        uint nftID;
    }
    
    mapping(address => Id) public commits;
    mapping(address => bool) public hasMinted;

    constructor(bytes32 _root) RandomlyAssigned(100, 0) ERC721("Merkle", "MER") {
        root = _root;               //0x4f8ac46ef7cf1c5274a9be484e75681e2fe6e5070e0fa17f5d2806910d30a124 hardhat
        stage = Stage.Presale;      //0x53c4e5e25bcbb26b82784b9793d8a74a02719aabab34c2d0358b26231e2f4bbe remix
    }

    function transferMultipleNFT(uint256[] memory tokenIds, address[] memory to) public {
        require(stage != Stage.Presale, "Presale isn't over");
        require(tokenIds.length == to.length, "tokenIds length doesnt match to length");
        for(uint i=0; i<to.length; i++){
            require(ownerOf(tokenIds[i]) == msg.sender, "Sender does not own this NFT");
            safeTransferFrom(msg.sender, to[i], tokenIds[i]);
        }
    }

    // commit to a value while keeping it hidden with the ability to reveal it later
    function submitCommit(uint number, string memory secret) public {
        Id storage commit = commits[msg.sender];
        require(stage == Stage.Presale, "presale is over");
        bytes32 numHash = keccak256(abi.encodePacked(number, secret));
        require(commit.hash != numHash, "Commitment already submitted");
        require(!hasMinted[msg.sender], "Already revealed");
        // uint tokenId = uint256(numHash);
        uint tokenId = nextToken();
        commit.hash = numHash;
        commit.blockNum = block.number;
        commit.nftID = tokenId;    
    }


    function reveal(uint number, string memory secret, bytes32[] memory proof) public {
        require(stage == Stage.PublicSale, "Not Public sale");
        Id memory commit = commits[msg.sender];
        require(!hasMinted[msg.sender], "Already revealed");
        require(commit.hash == keccak256(abi.encodePacked(number, secret)), "Invalid number and secret");
        require(block.number > commit.blockNum + 10, "Reveal too early");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, root, leaf));
        hasMinted[msg.sender] = true;
        _safeMint(msg.sender, commit.nftID);
    }

    function publicSale() public payable{
        require(stage == Stage.PublicSale, "Not Public sale");
        require(msg.value == 1 ether, "Send 1 eth");
        _safeMint(msg.sender, nextToken());
    }    

    function withdrawFunds(address[] memory contributors) public payable onlyOwner{
        for (uint i=0; i<contributors.length; i++){
            uint256 amount = payments(contributors[i]);     //payments owed to an address
            require(amount > 0, "Contributor has no funds to withdraw");
            withdrawPayments(payable(contributors[i]));
        }
    }

    function nextStage() public onlyOwner{
        require(stage != Stage.SupplyOut, "you're at the last stage");
        stage = Stage(uint(stage) + 1);         //casting: enum members are assigned consecutive integers starting from 0
    } 

    receive() external payable{

    }

}
 