
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
