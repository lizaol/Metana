// 0xc70cB09A4f01303B9Fd1F539B84d22e61c00431e               ERC1155 address


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./erc1155.sol";

contract forge is ERC1155Holder {
    erc1155 token;
    constructor(erc1155 _token){
        token = _token;
    }

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
            require(block.timestamp > (forgeTime + 60 seconds), "Not enough time passed");
            token.mint(to, id, amount);

        } else if (id == SWORD){
            require(token.balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(token.balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            token.burning(to, GOLD, 1);
            token.burning(to, SILVER,1);
            token.mint(to, SWORD, amount);

        } else if (id == SHIELD){
            require(token.balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            require(token.balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have hammer");
            uint[] memory arr = new uint[](2);
            uint[] memory price = new uint[](2);
            arr[0] = GOLD;
            arr[1] = SILVER;
            price[0] = 1;
            price[1] = 1;
            token.burningBatch(to, arr, price);
            token.mint(to, SHIELD, amount);

        } else if (id == LOKIS_HORNS){
            require(token.balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(token.balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have hammer");
            token.burning(to, GOLD, 1);
            token.burning(to, THORS_HAMMER,1);
            token.mint(to, LOKIS_HORNS, amount);

        } else if(id == POTION){
            require(token.balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(token.balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            require(token.balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have hammer");
            token.burning(to, GOLD, 1);
            token.burning(to, SILVER,1);
            token.burning(to, THORS_HAMMER,1);
            token.mint(to, POTION, amount);
        } else {
          require(id < 6, "Item doesn't exist");
        }
    }

    function trade(address account, uint256 id, uint256 amount) public{
        if(id == SHIELD){
            require(token.balanceOf(msg.sender, SHIELD) > amount, "You don't have shields");
            token.burning(account, id, amount);
        } else if (id == LOKIS_HORNS){
            require(token.balanceOf(msg.sender, LOKIS_HORNS) > amount, "You don't have loki's horns");
            token.burning(account, id, amount);
        } else if (id == POTION){
            require(token.balanceOf(msg.sender, POTION) > amount, "You don't have potion");
            token.burning(account, id, amount);
        } else if(id == GOLD) {
                require(token.balanceOf(msg.sender, GOLD) > 1, "You don't have gold");
                token.burning(account, GOLD, 1);
                token.mint(account, SILVER, 2);
        } else if (id == SILVER){
                require(token.balanceOf(msg.sender, SILVER) > 1, "You don't have silver");
                token.burning(account, SILVER, 1);
                token.mint(account, THORS_HAMMER, 1);
        } else {
                require(token.balanceOf(msg.sender, THORS_HAMMER) > 1, "You don't have hammer");
                token.burning(account, THORS_HAMMER, 1);
                token.mint(account, SILVER, 2);
                token.mint(account, GOLD, 2);
            }
        }



    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    /* function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes memory data) public virtual override returns (bytes4) {
        if (id == GOLD) {
          token.mint(msg.sender, GOLD, 10**18);
        }
        return this.onERC1155Received.selector;
    } */
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
