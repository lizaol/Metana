pragma solidity ^0.4.21;
import "./fuzzyIdentity.sol";

contract fuzzyAnswer is IName{
    function name() external view returns (bytes32) {
        return bytes32("smarx");
    }
    function authenticate(address _challenge) public {
      FuzzyIdentityChallenge(_challenge).authenticate(); 
   }
}


 