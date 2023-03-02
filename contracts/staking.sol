// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "./stakingErc20.sol";
import "./stakingErc721.sol";

contract staking is Ownable, IERC721Receiver{
    struct Stake {
        uint24 tokenId;
        uint48 timestamp;
        address owner;
    }
    stakingErc20 token;
    stakingErc721 nft;
    // uint public totalStaked;
    mapping(uint256 => Stake) public vault; 

    // constructor(stakingErc20 _token, stakingErc721 _nft){
    //   token = _token;
    //   nft = _nft;
    // }

    function stake(uint256 tokenId) public {
        // uint256 tokenId = _tokenIdCounter.current();
        // totalStaked += 1;
        require(nft.ownerOf(tokenId) == msg.sender, "not your token");
        require(vault[tokenId].tokenId == 0, "already staked");

        nft.transferFrom(msg.sender, address(this), tokenId);

        vault[tokenId] = Stake({
            owner: msg.sender,
            tokenId: uint24(tokenId),
            timestamp: uint48(block.timestamp)
        });
    }

    function unstake(address account, uint256 tokenId) public {
        // totalStaked -= 1;

        Stake memory staked = vault[tokenId];
        require(staked.owner == msg.sender, "not an owner");

        delete vault[tokenId];
        nft.transferFrom(address(this), account, tokenId);
  }



  function onERC721Received(address, address from, uint256, bytes calldata) external pure override returns (bytes4) {
      require(from == address(0x0), "Cannot send nfts to Vault directly");
      return IERC721Receiver.onERC721Received.selector;
    }
}