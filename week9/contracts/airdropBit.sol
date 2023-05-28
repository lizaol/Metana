// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
// import "@openzeppelin/contracts/utils/Multicall.sol";
enum Stage{
        Presale,
        PublicSale,
        SupplyOut
    }

contract MerkleToken is ERC721, Ownable, PullPayment {
    BitMaps.BitMap hasMinted;
    bytes32 public immutable root;
    Stage public stage;

    struct Id{              
        bytes32 hash;
        uint blockNum;
        uint nftID;
    }

    
    mapping(address => Id) public commits;

    constructor(bytes32 _root) ERC721("Merkle", "MER") {
        root = _root;               //0xd1babbf9ea29945894cc45eade556774e184365e4337da8a8d212a963c2fb28a hardhat
        stage = Stage.Presale;      //0xe9d7a2f71a0db906a648dcacab33a27edf2dc4a9fa6781e03bc604805edff0ad remix
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
    function submitCommit(uint number, string memory secret, uint index) public {
        Id storage commit = commits[msg.sender];
        require(stage == Stage.Presale, "presale is over");
        bytes32 numHash = keccak256(abi.encodePacked(number, secret));
        require(commit.hash != numHash, "Commitment already submitted");
        require(!BitMaps.get(hasMinted, index), "Already revealed");
        uint tokenId = uint256(numHash);
        commit.hash = numHash;
        commit.blockNum = block.number;
        commit.nftID = tokenId;    
    }

    function reveal(uint number, string memory secret, bytes32[] memory proof, uint index) public {
        require(stage == Stage.PublicSale, "Not Public sale");
        Id memory commit = commits[msg.sender];
        require(!BitMaps.get(hasMinted, index), "Already revealed");
        require(commit.hash == keccak256(abi.encodePacked(number, secret)), "Invalid number and secret");
        require(block.number > commit.blockNum + 10, "Reveal too early");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, index));
        require(MerkleProof.verify(proof, root, leaf));
        BitMaps.setTo(hasMinted, index, true);
        _safeMint(msg.sender, commit.nftID);
    }

    function deposit() public payable {
        _asyncTransfer(msg.sender, msg.value);
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

}
 