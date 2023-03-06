// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./erc1155.sol";

contract forge is ERC1155Holder, ERC1155Burnable, erc1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;
    uint256 public constant LOKIS_HORNS = 5;
    uint256 public constant POTION = 6;

    uint forgeTime = block.timestamp;
    mapping(address => uint256) timing;


    function forging(address to, uint256 id, uint256 amount) public{
        if (id == GOLD || id == SILVER || id == THORS_HAMMER){
            // uint lastMintAt = timing[msg.sender];
            // if (forgeTime == 0) {
            //     forgeTime = block.timestamp;
            // }
            // uint secondsPassed = block.timestamp - lastMintAt;
            require(block.timestamp > (forgeTime + 60 seconds), "No enought time past");
            erc1155.mint(to, id, amount);
            // timing[msg.sender] = block.timestamp;

        } else if (id == SWORD){
            require(balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            // _burnBatch(to, [GOLD, SILVER], burningPrice);
            erc1155.burning(to, GOLD, 1);
            erc1155.burning(to, SILVER,1);
            erc1155.mint(to, SWORD, amount);

        } else if (id == SHIELD){
            require(balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have gold");
            require(balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            uint[] memory arr = new uint[](2);
            uint[] memory price = new uint[](2);
            arr[0] = GOLD;
            arr[1] = SILVER;
            price[0] = 1;
            price[1] = 1;
            erc1155.burningBatch(to, arr, price);
            erc1155.mint(to, SHIELD, amount);

        } else if (id == LOKIS_HORNS){
            require(balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have silver");
            erc1155.burning(to, GOLD, 1);
            erc1155.burning(to, THORS_HAMMER,1);
            erc1155.mint(to, LOKIS_HORNS, amount);

        } else if (id == POTION){
            require(balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            require(balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have silver");
            erc1155.burning(to, GOLD, 1);
            erc1155.burning(to, SILVER,1);
            erc1155.burning(to, THORS_HAMMER,1);
            erc1155.mint(to, POTION, amount);
        }
    }

    function trade(address account, uint256 id, uint256 amount) public{
        if(id == SHIELD || id == LOKIS_HORNS || id == POTION){
            require(balanceOf(msg.sender, SHIELD) > amount, "You don't have shields");
            require(balanceOf(msg.sender, LOKIS_HORNS) > amount, "You don't have loki's horns");
            require(balanceOf(msg.sender, POTION) > amount, "You don't have potion");
            erc1155.burning(account, id, amount);
        } else {
            if(id == GOLD) {
                require(balanceOf(msg.sender, GOLD) > 1, "You don't have gold");
                erc1155.burning(account, GOLD, 1);
                erc1155.mint(account, SILVER, 2);
            } else if (id == SILVER){
                require(balanceOf(msg.sender, SILVER) > 1, "You don't have silver");
                erc1155.burning(account, SILVER, 1);
                erc1155.mint(account, THORS_HAMMER, 1);
            } else {
                require(balanceOf(msg.sender, THORS_HAMMER) > 1, "You don't have gold");
                erc1155.burning(account, THORS_HAMMER, 1);
                erc1155.mint(account, SILVER, 2);
                erc1155.mint(account, GOLD, 2);
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
