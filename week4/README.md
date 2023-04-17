Slither false positives:
1. This false positive is with the openzepplin library 
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse = (3 * denominator) ^ 2 (node_modules/@openzeppelin/contracts/utils/math/Math.sol#117)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#121)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#122)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#123)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#124)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#125)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#126)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- prod0 = prod0 / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#105)
	- result = prod0 * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#132)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#divide-before-multiply

2. _doSafeTransferAcceptanceCheck() and _doSafeBatchTransferAcceptanceCheck() false positives
INFO:Detectors:
ERC1155._doSafeTransferAcceptanceCheck(address,address,address,uint256,uint256,bytes).reason (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#480) is a local variable never initialized
ERC1155._doSafeBatchTransferAcceptanceCheck(address,address,address,uint256[],uint256[],bytes).reason (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#503) is a local variable never initialized
ERC1155._doSafeBatchTransferAcceptanceCheck(address,address,address,uint256[],uint256[],bytes).response (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#498) is a local variable never initialized
ERC1155._doSafeTransferAcceptanceCheck(address,address,address,uint256,uint256,bytes).response (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#476) is a local variable never initialized
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#uninitialized-local-variables
INFO:Detectors:
ERC1155._doSafeTransferAcceptanceCheck(address,address,address,uint256,uint256,bytes) (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#467-486) ignores return value by IERC1155Receiver(to).onERC1155Received(operator,from,id,amount,data) (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#476-484)
ERC1155._doSafeBatchTransferAcceptanceCheck(address,address,address,uint256[],uint256[],bytes) (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#488-509) ignores return value by IERC1155Receiver(to).onERC1155BatchReceived(operator,from,ids,amounts,data) (../../../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#497-507)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unused-return




Vertigo:
I ran Vertigo on all of my contracts in the week1 folder, so 53 mutants include other contracts. I pasted result only for partialRefund
https://github.com/lizaol/Metana/tree/main/week1/contracts

vertigo run --hardhat-parallel 8
[*] Starting mutation testing
[*] Starting analysis on project
[*] Initializing campaign run 
[*] Checking validity of project
[+] The project is valid
[*] Storing compilation results
[*] Running analysis on 53 mutants
100%|███████████████████████████████████████| 53/53 [13:59<00:00, 15.85s/mutant]
[*] Done with campaign run
[+] Report:
Mutation testing report:
Number of mutations:    53
Killed:                 16 / 53

Mutations:

[+] Survivors

Mutation:
    File: /Users/elizavetaolenberg/Desktop/metana/Metana/week1/contracts/erc20PartialRefund.sol
    Line nr: 33
    Result: Lived
    Original line:
                 require(address(this).balance > (amountS * tokenPrice) / 10 ** decimals(), "SC doesn't hold enough ether");

    Mutated line:
                 require(address(this).balance >= (amountS * tokenPrice) / 10 ** decimals(), "SC doesn't hold enough ether");

Mutation:
    File: /Users/elizavetaolenberg/Desktop/metana/Metana/week1/contracts/erc20PartialRefund.sol
    Line nr: 33
    Result: Lived
    Original line:
                 require(address(this).balance > (amountS * tokenPrice) / 10 ** decimals(), "SC doesn't hold enough ether");

    Mutated line:
                 require(address(this).balance > (amountS / tokenPrice) / 10 ** decimals(), "SC doesn't hold enough ether");

Mutation:
    File: /Users/elizavetaolenberg/Desktop/metana/Metana/week1/contracts/erc20PartialRefund.sol
    Line nr: 19
    Result: Lived
    Original line:
                 minting();

    Mutated line:
                 

Mutation:
    File: /Users/elizavetaolenberg/Desktop/metana/Metana/week1/contracts/erc20PartialRefund.sol
    Line nr: 22
    Result: Lived
    Original line:
             function withdraw() public onlyOwner{

    Mutated line:
             function withdraw() public {
