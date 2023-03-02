// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract erc20liz is ERC20, Ownable {
    constructor() ERC20("Liza", "LIZ") {
        _mint(msg.sender, 300 * 10 ** decimals());
    }

    function transferToken(address to, uint amount) public payable{
        _transfer(msg.sender, to,  amount* 10 ** decimals());
    }
}
