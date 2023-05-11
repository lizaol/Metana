// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract GuessTheNewNumberChallenge {
    constructor() payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp
                    )
                )
            )
        );

        if (n == answer) {
            payable(msg.sender).transfer(2 ether);
        }
    }
}
// pragma solidity ^0.4.21;

// contract GuessTheNewNumber {
//     function GuessTheNewNumber() public payable {
//         require(msg.value == 1 ether);
//     }

//     function isComplete() public view returns (bool) {
//         return address(this).balance == 0;
//     }

//     function guess(uint8 n) public payable {
//         require(msg.value == 1 ether);
//         uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

//         if (n == answer) {
//             msg.sender.transfer(2 ether);
//         }
//     }
// }
