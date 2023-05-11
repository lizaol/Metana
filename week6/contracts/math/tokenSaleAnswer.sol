// SPDX-License-Identifier: MIT
pragma solidity ^0.4.21;

contract over {
    uint maxT = (2 ** 256 - 1);
    uint t = maxT / 10 ** 18 + 1;

    function ov() public view returns (uint) {
        return t * 1000000000000000000; // 415992086870360064
    }

    function maxTokens() public view returns (uint) {
        return t; // 115792089237316195423570985008687907853269984665640564039458
    }
}
