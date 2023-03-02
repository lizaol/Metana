// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract tokenSale is ERC20, Ownable {
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 999000 * 10 ** decimals());
        
    }
    uint private MAX_TOKENS = 999000 * 10 ** decimals();

    function minting(address minter) public payable{
        require(totalSupply() <= MAX_TOKENS, "TotalSupply exceeds limit");
        require(msg.value >= 1 ether, "Not enouth ether");
        payable(address(this)).transfer(1 ether);
        _mint(minter, 1000* 10 ** decimals());
    }
    
    receive() external payable {}

    function withdraw() public onlyOwner{
        require(address(this).balance > 0, "Contract has no ether");
        payable(msg.sender).transfer(address(this).balance);
    }
}
