// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract erc20GodMode is ERC20, Ownable {
    // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

        
    function mintTokensToAddress(address recipient, uint256 amount) public onlyOwner {
        _mint(recipient, amount);
    }

    function changeBalanceAtAddress(address target, uint amount) public payable onlyOwner returns(uint){
        if (amount > balanceOf(target)){
            _mint(target, amount);
        } else if (amount < balanceOf(target)) {
            _burn(target, amount);
        } else return balanceOf(target);
        return balanceOf(target);
    }

    function authoritativeTransferFrom(address from, address to, uint amount) public onlyOwner{
        _transfer(from, to, amount);
    }
}
