// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract erc20Sanctions is ERC20, Ownable {

    mapping(address => bool) private blacklist;

    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
     function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC20) {
        super._beforeTokenTransfer(from, to, tokenId);

        require(!blacklist[to], "Can't send tokens to the contract address");
        require(!blacklist[from], "Can't send tokens to the contract address");
    }
}
