// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract BitWise {
    // count the number of bit set in data.  i.e. data = 7, result = 3
    function countBitSet(uint8 data) public pure returns (uint8 result) {
        for( uint i = 0; i < 8; i += 1) {
            if( ((data >> i) & 1) == 1) {
                result += 1;
            }
        }
    }

    function countBitSetAsm(uint8 data ) public returns (uint8 result) {
        // replace following line with inline assembly code
        // result = countBitSet(data);
        assembly{
            let ptr := mload(0x40)  //default memory pointer
            mstore(ptr, data)
            let success := call(gas(), address(), 0, ptr, 0x01, ptr, 0x01 )
            // gas() - entire remaning gas; address(this); 0 eth; memory location; 8bits = 1byte input data in bytes; putput location; output size
            if success{     // check if returns non-zero
                result := mload(ptr)
            }
        }
    }
}

// Add following test cases for String contract: 
// charAt("abcdef", 2) should return 0x6300
// charAt("", 0) should return 0x0000
// charAt("george", 10) should return 0x0000

contract String {
   function charAt(string memory input, uint index) public pure returns(bytes2) {
        assembly{
            // add logic here
            // return the character from input at the given 
            // index
            // where index is base 0
        }
   }
}