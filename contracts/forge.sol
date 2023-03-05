// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./erc1155.sol";

contract forge is ERC1155Holder, ERC1155Burnable {
    // erc1155 public token;
    ERC1155 token = ERC1155(0xd9145CCE52D386f254917e481eB44e9943F39138);
    // uint256 lastMintAt;
    mapping(address => uint256) timing;
    // constructor(address erc1155A){
    //     token = erc1155(erc1155A);
    //     ERC1155 token = ERC1155(erc1155A);
    // }

    function forging(address to, uint256 id, uint256 amount) public{
        if (id == token.GOLD || id == token.SILVER || id == token.THORS_HAMMER){
            uint lastMintAt = timing[msg.sender];
            if (lastMintAt == 0) {
                timing[msg.sender] = block.timestamp;
            }
            uint secondsPassed = block.timestamp - lastMintAt;
            require(secondsPassed > 60, "No enought time past");
            token.mint(to, id, amount, "");
            timing[msg.sender] = block.timestamp;

        } else if (id == token.SWORD){
            require(balanceOf(msg.sender, token.GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, token.SILVER) > 0, "You don't have silver");
            // _burnBatch(to, [GOLD, SILVER], burningPrice);
            _burn(to, token.GOLD, 1);
            _burn(to, token.SILVER,1);
            token.mint(to, token.SWORD, amount, '');

        } else if (id == token.SHIELD){
            require(balanceOf(msg.sender, token.THORS_HAMMER) > 0, "You don't have gold");
            require(balanceOf(msg.sender, token.SILVER) > 0, "You don't have silver");
            uint[] memory arr = new uint[](2);
            uint[] memory price = new uint[](2);
            arr[0] = token.GOLD;
            arr[1] = token.SILVER;
            price[0] = 1;
            price[1] = 1;
            _burnBatch(to, arr, price);
            // _burn(to, THORS_HAMMER, 1);
            // _burn(to, SILVER,1);
            token.mint(to, token.SHIELD, amount, '');

        } else if (id == token.LOKIS_HORNS){
            require(balanceOf(msg.sender, token.GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, token.THORS_HAMMER) > 0, "You don't have silver");
            _burn(to, token.GOLD, 1);
            _burn(to, token.THORS_HAMMER,1);
            token.mint(to, token.LOKIS_HORNS, amount, '');

        } else if (id == token.POTION){
            require(balanceOf(msg.sender, token.GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, token.SILVER) > 0, "You don't have silver");
            require(balanceOf(msg.sender, token.THORS_HAMMER) > 0, "You don't have silver");
            _burn(to, token.GOLD, 1);
            _burn(to, token.SILVER,1);
            _burn(to, token.THORS_HAMMER,1);
            token.mint(to, token.POTION, amount, '');
        }
    }

    function trade(address account, uint256 id, uint256 amount) public{
        if(id == token.SHIELD || id == token.LOKIS_HORNS || id == token.POTION){
            require(balanceOf(msg.sender, token.SHIELD) > amount, "You don't have shields");
            require(balanceOf(msg.sender, token.LOKIS_HORNS) > amount, "You don't have loki's horns");
            require(balanceOf(msg.sender, token.POTION) > amount, "You don't have potion");
            _burn(account, id, amount);
        } else {
            if(id == token.GOLD || id == token.THORS_HAMMER) {
                _burn(account, token.GOLD, 1);
                token.mint(account, token.SILVER, 2);
            } else if (id == token.SILVER){
                _burn(account, token.SILVER, 1);
                token.mint(account, token.THORS_HAMMER, 1);
            } else {
                _burn(account, token.THORS_HAMMER, 1);
                token.mint(account, token.SILVER, 2);
                token.mint(account, token.GOLD, 2);
            }
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }
    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

}
