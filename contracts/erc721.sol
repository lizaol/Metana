// I tried different implementations of this contract but in all cases my metamask freezes
// when I try to mint. Nevertheless, it allows me to deploy contracts, and I can see them on etherscan. 
// I provide two versions of code that I used, both freeze when mint function is triggered.  
// Also, I uloaded files to ipsf but links that provided don't work and my browser shows "504 getaway time=out"
// Here a link that ipfs gave me https://ipfs.io/ipfs/QmZwDLeVkeoM5gEanLzdyJfLGz3wKaFydYZ9mVv3HdTjhm?filename=apple.jpg


// Version 1 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";

contract erc721 is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Apples", "APL") {}

    function _baseURI() internal pure override returns (string memory) {
        return "<Add the metadata URL here>";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}


// Version 2
// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract Apples is ERC721URIStorage, Ownable {
//     constructor() ERC721("Apples", "APL") {}

//     function mint(address to, uint tokenId, string calldata uri) external onlyOwner {
//         _mint(to, tokenId);
//         _setTokenURI(tokenId, uri);
//     }
// }

