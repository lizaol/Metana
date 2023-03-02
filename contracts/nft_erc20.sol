// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./erc20liz.sol";
import "./erc721liz.sol";


contract nft_erc20 is erc721liz{
    // uint private minAmount = 10* 10 ** decimals();       doesnt work
    uint private minAmount = 10* 10 ** 18;

    function getContractBalance(IERC20 token) public view returns(uint){
        return token.balanceOf(address(this));
   }

   function minting(IERC20 token) public {
        require(token.balanceOf(address(this)) >= minAmount, "SC doesnt have enought tokens");
        erc721liz.safeMint(msg.sender);
        // erc721liz.safeMint(address(this));           doesnt work
   }
}