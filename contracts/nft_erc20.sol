// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract nft_erc20{
    uint private minAmount = 10* 10 ** 18;
    erc20liz token; 
    erc721liz nft;

    constructor(erc20liz _token, erc721liz _nft){
      token = _token;
      nft = _nft;
    }

   function minting() public {
        require(token.balanceOf(address(this)) >= minAmount, "SC doesnt have enought tokens");
        nft.safeMint(msg.sender);
   }

    function getContractBalance() public view returns(uint){
        return token.balanceOf(address(this));
  }
}


contract erc721liz is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() ERC721("Liza", "LIZ") {}

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}

contract erc20liz is ERC20, Ownable {
    constructor() ERC20("Liza", "LIZ") {
        _mint(msg.sender, 300 * 10 ** decimals());
    }

    function transferToken(address to, uint amount) public payable onlyOwner{
        _transfer(msg.sender, to,  amount* 10 ** decimals());
    }
}
