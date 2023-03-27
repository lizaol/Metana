// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./erc20PartialRefund.sol";

contract mock_pr is erc20partialRefund{
    constructor() erc20partialRefund(){
    }
    function setMax(uint _max) public{
        MAX_TOKENS = _max;
    }
}

 
