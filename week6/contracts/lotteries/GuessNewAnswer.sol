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
        // uint8 answer = uint8(keccak256(abi.encodePacked(block.blockhash(block.number - 1), block.timestamp)));
        // (msg.sender).transfer(address(this).balance);
        // challenge.guess(answer);
        // challenge.guess{value: 1 ether}(answer);
        // challenge.guess{value: 1 ether}(answer);
        // challenge.guess(answer, {value: 1 ether});
    }


    // function complete() public pure returns(bool){
    //     return true;
    // }

    // function complete() public view returns(bool){
    //     // GuessTheNewNumberChallenge challenge = GuessTheNewNumberChallenge(_challenge);
    //     return challenge.isComplete();
    // }

} 






