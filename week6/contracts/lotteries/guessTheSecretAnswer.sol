pragma solidity ^0.4.21;

contract GuessTheSecretNumberAnswer {
    bytes32 answerHash =
        0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;

    function answer() public view returns (uint8) {
        for (uint8 i = 0; i <= 255; i++) {
            if (keccak256(i) == answerHash) {
                return i; // 170
            }
        }
    }
}
