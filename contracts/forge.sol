// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./erc1155.sol";

contract forge is ERC1155Holder, ERC1155Burnable, erc1155 {
    erc1155 token;
    // uint256 lastMintAt;
    mapping(address => uint256) timing;

    function mint(address to, uint256 id, uint256 amount) public{
        if (id == GOLD || id == SILVER || id == THORS_HAMMER){
            uint lastMintAt = timing[msg.sender];
            if (lastMintAt == 0) {
                timing[msg.sender] = block.timestamp;
            }
            uint secondsPassed = block.timestamp - lastMintAt;
            require(secondsPassed > 60, "No enought time past");
            _mint(to, id, amount, "");
            timing[msg.sender] = block.timestamp;

        } else if (id == SWORD){
            require(balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            // _burnBatch(to, [GOLD, SILVER], burningPrice);
            _burn(to, GOLD, 1);
            _burn(to, SILVER,1);
            _mint(to, SWORD, amount, '');

        } else if (id == SHIELD){
            require(balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have gold");
            require(balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            // _burnBatch(to, [GOLD, SILVER], burningPrice);
            _burn(to, THORS_HAMMER, 1);
            _burn(to, SILVER,1);
            _mint(to, SHIELD, amount, '');

        } else if (id == LOKIS_HORNS){
            require(balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have silver");
            // _burnBatch(to, [GOLD, SILVER], burningPrice);
            _burn(to, GOLD, 1);
            _burn(to, THORS_HAMMER,1);
            _mint(to, LOKIS_HORNS, amount, '');

        } else if (id == POTION){
            require(balanceOf(msg.sender, GOLD) > 0, "You don't have gold");
            require(balanceOf(msg.sender, SILVER) > 0, "You don't have silver");
            require(balanceOf(msg.sender, THORS_HAMMER) > 0, "You don't have silver");
            // _burnBatch(to, [GOLD, SILVER], burningPrice);
            _burn(to, GOLD, 1);
            _burn(to, SILVER,1);
            _burn(to, THORS_HAMMER,1);
            _mint(to, POTION, amount, '');
        }
    }

    function burn(address account, uint256 id, uint256 amount) public override{
        if(id == SHIELD || id == LOKIS_HORNS || id == POTION){
            require(balanceOf(msg.sender, SHIELD) > amount, "You don't have shields");
            require(balanceOf(msg.sender, LOKIS_HORNS) > amount, "You don't have loki's horns");
            require(balanceOf(msg.sender, POTION) > amount, "You don't have potion");
            _burn(account, id, amount);
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