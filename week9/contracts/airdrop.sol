// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";

// import "@openzeppelin/contracts/utils/Multicall.sol";


contract MerkleToken is ERC721, Ownable, PullPayment {
    using BitMaps for BitMaps.BitMap;
    BitMaps.BitMap private claimed;
    bytes32 public immutable root;
    uint public immutable rewardAmount;
    
    struct Id{              
        bytes32 hash;
        uint blockNum;
        uint nftID;
    }

    enum Stage{
        Presale,
        PublicSale,
        SupplyOut
    }
    Stage public stage;
    mapping(address => Id) public commits;
    mapping(address => bool) public hasMinted;

    constructor(bytes32 _root, uint _amount) ERC721("Merkle", "MER") {
        root = _root;
        rewardAmount = _amount;
        stage = Stage.Presale;
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
        require(stage == Stage.Presale, "presale is over");
        bytes32 numHash = bytes32(keccak256(abi.encodePacked(number, secret)));
        require(commits[msg.sender].hash != numHash, "Commitment already submitted");
        commits[msg.sender] = Id(numHash, block.number, 0);                                 // ????
    }

    function reveal(uint number, string memory secret) public {
        require(stage == Stage.PublicSale, "Not Public sale");
        Id storage commit = commits[msg.sender];
        // require(!commit.revealed, "Already revealed");
        require(!hasMinted[msg.sender], "Already revealed");
        require(commit.hash == keccak256(abi.encodePacked(number, secret)), "Invalid reveal");
        require(block.number > commit.blockNum + 10, "Reveal too early");
        uint tokenId = uint256(keccak256(abi.encodePacked(number, secret, blockhash(commit.blockNum + 10))));
        hasMinted[msg.sender] = true;
        commit.nftID = tokenId;
        _safeMint(msg.sender, tokenId);
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
 