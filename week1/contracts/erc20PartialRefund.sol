// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract erc20partialRefund is ERC20, Ownable{
    constructor() ERC20("Gold", "GLD") {}
    uint public MAX_TOKENS = 1000000 * 10 ** decimals();

    // Token Sale
    function minting() public payable{
        require(msg.value >= 1 ether, "Not enough ether");
        require(totalSupply() <= MAX_TOKENS, "TotalSupply exceeds limit");
        _mint(msg.sender, 1000* 10 ** decimals());
    }

    receive() external payable {
        minting();
    }

    function withdraw() public onlyOwner{
        require(address(this).balance > 0, "Contract has no ether");
        payable(msg.sender).transfer(address(this).balance);
    }

    // 0.005 eth for 1 token
    uint tokenPrice = 5 * 10 **14;

    function sellBack(uint amount) public {
        uint amountS  = amount * 10 ** decimals();
        require(amountS > 0, "You need to sell at least some tokens");
        require(address(this).balance > (amountS * tokenPrice) / 10 ** decimals(), "SC doesn't hold enough ether");
        // no need to approve when useing _transfer
	    _transfer(msg.sender, address(this), amountS);
	    payable(msg.sender).transfer((amountS * tokenPrice) / 10 ** decimals());
    }
}
