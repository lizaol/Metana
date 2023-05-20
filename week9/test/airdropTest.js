// import "hardhat/console.sol";
const { expect } = require("chai");
// const { assert } = require("console");
const { ethers } = require("hardhat");
describe("MerkleToken", function () {
  let MerkleTok;
  let merkleToken;
  let owner;
  let acc1;
  let acc2

  beforeEach(async function () {
    [owner, acc1, acc2] = await ethers.getSigners();

    MerkleTok = await ethers.getContractFactory("MerkleToken");
    merkleToken = await MerkleTok.deploy("0x4f8ac46ef7cf1c5274a9be484e75681e2fe6e5070e0fa17f5d2806910d30a124");
    await merkleToken.deployed();

    console.log("MerkleToken deployed to:", merkleToken.address);
  });

  it("should submit a commit", async function () {
    // Submit a commit
    await merkleToken.submitCommit(1, "a");
    const numHash = ethers.utils.keccak256(1, "a");
    const commit = await merkleToken.commits(owner.address);
    console.log(numHash)
    console.log(commit.hash)
    expect(merkleToken.commits(owner).hash === numHash)
  });

  // it("should transfer multiple NFTs", async function () {
  //   // Mint some NFTs
  //   const tokenIds = [1, 2, 3];
  //   const to = [otherAccount.address, otherAccount.address, otherAccount.address];
  //   await merkleToken.transferMultipleNFT(tokenIds, to);

  //   // Check if the ownership has changed
  //   for (let i = 0; i < tokenIds.length; i++) {
  //     expect(await merkleToken.ownerOf(tokenIds[i])).to.equal(otherAccount.address);
  //   }
  // });

});
