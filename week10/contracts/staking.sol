// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract stakingUp is Initializable, IERC721ReceiverUpgradeable{
  struct Stake {
        uint tokenId;
        uint timestamp;
        address owner;
        bool stakedBool;
    } 

  erc20Up token;
  erc721Up nft;
  uint private tokenSec;    // tokens per second 
  mapping(uint256 => Stake) public vault;     // tokenId => Stake
  uint timeDeployed;

  function initialize(erc20Up _token, erc721Up _nft) external initializer{
    token = _token;
    nft = _nft;
    timeDeployed = block.timestamp;
    tokenSec = uint256(10 * 10 ** 18) / 24 / 60 / 60;
  }
  function stake(uint256 tokenId) public {
        require(nft.ownerOf(tokenId) == msg.sender, "not your token");
        require(!vault[tokenId].stakedBool, "already staked");
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
        require(staked.owner != address(0) && staked.owner == msg.sender, "not an owner");
        delete staked;
        nft.transferFrom(address(this), account, tokenId);
        // console.log("tokens:", token.balanceOf(address(this)), "nfts: ", nft.balanceOf(address(this)));
  }

  function withdraw(uint tokenId) public{
        Stake memory staked = vault[tokenId];
        require(staked.owner != address(0) && staked.owner == msg.sender, "not an owner");
        uint stakedAt = staked.timestamp;
        uint timeDiff = block.timestamp - stakedAt;
        // require(timeDiff >= 24 hours, "A day hasn't passed");
        require(timeDiff >= 30 seconds, "A day hasn't passed");      // for testing 
        token.mint(staked.owner, tokenSec * timeDiff);
        if (staked.timestamp <= 0) {    // slither suggestion
          staked.timestamp = 0;
        }
    }

  function onERC721Received(address, address from, uint256, bytes calldata) external pure override returns (bytes4) {
      require(from == address(0x0), "Cannot send nfts to Vault directly");
      return IERC721ReceiverUpgradeable.onERC721Received.selector;
    }
}



contract erc20Up is Initializable, ERC20Upgradeable, OwnableUpgradeable {
  function initialize() external initializer{
          __ERC20_init("Tok", "TK");
          _mint(msg.sender, 100 *10 **decimals());
  }

  function mint(address to, uint256 amount) external{
    _mint(to, amount);
  }
}

contract erc721Up is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdCounter;

    function initialize() external initializer{
      __ERC721_init("Tok", "TK");
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
