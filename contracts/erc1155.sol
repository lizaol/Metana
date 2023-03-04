// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol';

contract erc1155 is ERC1155, Ownable, ERC1155Burnable {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;
    uint256 public constant LOKIS_HORNS = 5;
    uint256 public constant POTION = 6;

    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmYXHrLLax44SpNbdjf6MiwK1bYTCdx9Wug4hdAUjZB26X?_gl=1*1wju8jh*_ga*MTAzODYxMTc4Mi4xNjc3MzU0NDEw*_ga_5RMPXG14TE*MTY3NzkzNjU5Ny43LjAuMTY3NzkzNjU5Ny42MC4wLjA/{id}.json") {
    }

}

