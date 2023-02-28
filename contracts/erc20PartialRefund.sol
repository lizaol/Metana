// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract partialRefund is ERC20, Ownable, AccessControl {
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");


    constructor() ERC20("Gold", "GLD") {}
    uint private MAX_TOKENS = 999000 * 10 ** decimals();
    IERC20 public token;

    // Token Sale
    function minting(address minter) public payable{
        require(totalSupply() <= MAX_TOKENS, "TotalSupply exceeds limit");
        require(msg.value == 1 ether, "Not enouth ether");
        payable(address(this)).transfer(1 ether);
        _mint(minter, 1000* 10 ** decimals());
    }
    
    receive() external payable {}

    function withdraw() public onlyOwner{
        require(address(this).balance > 0, "Contract has no ether");
        payable(msg.sender).transfer(address(this).balance);
    }

    // 0.0005 eth for 1 token
    uint tokenPrice = 500000000000000 wei; 

    
    function sellBack(uint amount) public payable{
        amount  = amount * 10 ** decimals();
        approve(address(this), amount);
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(amount > 0, "You need to sell at least some tokens");
        require(allowance >= amount, "Check the token allowance");
	    token.transferFrom(msg.sender, address(this), amount);
	    payable(msg.sender).transfer(amount * tokenPrice);
    }
}
