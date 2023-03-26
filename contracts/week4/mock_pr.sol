// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../week1/erc20PartialRefund.sol";

contract mock_pr is erc20partialRefund{
    constructor() erc20partialRefund(){
        MAX_TOKENS = 1000 * 10 ** decimals();
    }
}

