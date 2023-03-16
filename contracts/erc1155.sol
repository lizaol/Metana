// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract erc1155 is ERC1155, Ownable, ERC1155Burnable {
    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmeL83V8huVw9NotUtiUujWsWGsJmoBvYBW1JXbhnpohrQ/{id}.json") {
    }

    function mint(address to, uint256 id, uint256 amount) public{
        _mint(to, id, amount, '');
    }

    function burning(address account, uint256 id, uint256 amount) public{
        _burn(account, id, amount);
    }

    function burningBatch(address account, uint256[] memory ids, uint256[] memory amounts) public{
        _burnBatch(account, ids, amounts);
    }
}
