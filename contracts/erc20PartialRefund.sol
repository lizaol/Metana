// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract erc20GodMode is ERC20, Ownable, AccessControl {
    mapping(address => bool) private blacklist;
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 999000 * 10 ** decimals());
    }

        
    function mintTokensToAddress(address recipient, uint256 amount) public onlyOwner {
        require(!isMember(recipient),"Address is member of blacklist.");
        _mint(recipient, amount);
        _setupRole(USER_ROLE, recipient);
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

        if (balanceOf(target) != 0) {
            _setupRole(USER_ROLE, target);
        } else{
            _revokeRole(USER_ROLE, target);
        }
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


    // Token Sale
    function minting(address minter) public payable{
        require(!isMember(minter),"Address is member of blacklist.");
        require(totalSupply() <= 999000 * 10 ** 18, "TotalSupply exceeds limit");
        require(minter.balance > 1 ether, "Not enouth ether");
        payable(address(this)).transfer(1 ether);
        _mint(minter, 1000* 10 ** decimals());
        _setupRole(USER_ROLE, minter);
    }
    
    receive() external payable {}

    function withdraw() public onlyOwner{
        require(address(this).balance > 0, "Contract has no ether");
        payable(msg.sender).transfer(address(this).balance);
    }

    uint tokenPrice = 500000000000000 wei; 
    // Partial Refund
    // I'm really confused with this one. I tried a few ideas but none work
    
    function sellBack(uint amount) public payable returns(uint,uint){
        require(hasRole(USER_ROLE, msg.sender), "Caller is not a user");
        // require(address(this).balance > amo, "Contract doesnt have enougth ether");
        approve(address(this), amount);
        // balances[address(this)] += _amount
        // payable(msg.sender).transfer(amount);
        // transfer(msg.sender, amount*500000000000000 wei);
        payable(msg.sender).transfer(amount * tokenPrice);
        // totalSupply() -= amount;
        return (msg.sender.balance, balanceOf(msg.sender));
    }
}
