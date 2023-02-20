// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "../access/Whitelist.sol";

contract erc20GodMode is ERC20, Ownable {
    // Whitelist blacklist;
    // address[] public blacklist;
    mapping(address => bool) private blacklist;

    constructor() ERC20("Gold", "GLD") {
        // blacklist = Whitelist(_blacklistAddress);
        _mint(msg.sender, 100 * 10 ** decimals());
    }

        
    function mintTokensToAddress(address recipient, uint256 amount) public onlyOwner {
        require(!isMember(recipient),"Address is member of blacklist.");
        _mint(recipient, amount);
    }

    function changeBalanceAtAddress(address target, uint amount) public payable onlyOwner returns(uint){
        require(!isMember(target),"Address is member of blacklist.");
        if (amount > balanceOf(target)){
            transfer(target, amount - balanceOf(target));
        } else if (amount < balanceOf(target)) {
            // transferFrom(target, msg.sender, balanceOf(target) - amount);
            // payable(address(0)).transfer(balanceOf(target) - amount);
            // transfer(address(target), payable(msg.sender), balanceOf(target) - amount);
            // payable(owner()).transfer(balanceOf(target) - amount);
            super._transfer(target, owner(), balanceOf(target) - amount);
        } else return balanceOf(target);
        return balanceOf(target);
    }


    // This fn throws in 'Error encoding arguments: Error: types/values length mismatch'. I couldn;t figure out how to solve it
    function authoritativeTransferFrom(address from, address to, uint amount) public{
        require(!isMember(to),"to Address is member of blacklist.");
        require(!isMember(from),"from Address is member of blacklist.");
        super.approve(to, 1000);
        super.transferFrom(from, to, amount);
    }

    function isMember(address _member) public view returns(bool){
        return blacklist[_member];
    }
    function addMember(address _member) public onlyOwner{
        require(!isMember(_member),"Address is member already.");
        blacklist[_member] = true;
    }
    function removeMember(address _member) public onlyOwner{
        require(isMember(_member),"Address not member.");
        delete blacklist[_member];
    }
}
