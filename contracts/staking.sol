// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract staking is Ownable, IERC721Receiver{
  struct Stake {
        uint tokenId;
        uint timestamp;
        address owner;
        bool stakedBool;
    }

  stakingErc20 token;
  stakingErc721 nft;
    
  mapping(uint256 => Stake) public vault;     // tokenId => Stake

  uint timeDeployed;
  constructor(stakingErc20 _token, stakingErc721 _nft){
      token = _token;
      nft = _nft;
      timeDeployed = block.timestamp;
    }

  function stake(uint256 tokenId) public {
        require(nft.ownerOf(tokenId) == msg.sender, "not your token");
        require(vault[tokenId].stakedBool == false, "already staked");
        nft.transferFrom(msg.sender, address(this), tokenId);
        vault[tokenId] = Stake({
            owner: msg.sender,
            tokenId: uint(tokenId),
            timestamp: uint(block.timestamp),
            stakedBool: true
        });
    }

  function unstake(address account, uint256 tokenId) public {
        Stake memory staked = vault[tokenId];
        require(staked.owner == msg.sender, "not an owner");
        delete staked;
        nft.transferFrom(address(this), account, tokenId);
  }

  // tokens per second 
  uint private tokenSec = uint256(10 * 10 ** 18) / 24 / 60 / 60;

  function withdraw(address to, uint tokenId) public{
        Stake memory staked = vault[tokenId];
        require(staked.owner == msg.sender, "not an owner");
        uint stakedAt = staked.timestamp;
        uint timeDiff = block.timestamp - stakedAt;
        require(timeDiff >= 24 hours, "A day hasn't passed");
        token.mint(to, tokenSec * timeDiff);
        staked.timestamp == 0;
    }

  function onERC721Received(address, address from, uint256, bytes calldata) external pure override returns (bytes4) {
      require(from == address(0x0), "Cannot send nfts to Vault directly");
      return IERC721Receiver.onERC721Received.selector;
    }
}



contract stakingErc20 is ERC20, Ownable {
  constructor() ERC20("Liza", "LIZ") { 
      _mint(msg.sender, 100 *10 **decimals());
  }

  function mint(address to, uint256 amount) external onlyOwner{
    _mint(to, amount);
  }
}

contract stakingErc721 is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Liza", "LIZ") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
