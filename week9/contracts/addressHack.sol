// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Address.sol";

contract Target {
    using Address for address;
    bool public pwned = false;

    function protected() external {
        require(!(msg.sender).isContract(), "no contract allowed");
        require(msg.sender == tx.origin, "only externally owned accounts can call this function");
        pwned = true;
    }
}

contract FailedAttack {
    function pwn(address _target) external {
        Target(_target).protected();
    }
}

contract Hack {
    bool public isContract;
    address public addr;
    using Address for address;

    constructor(address _target) {
        isContract = address(this).isContract();
        Target(_target).protected();
    }
}
