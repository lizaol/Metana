import "hardhat/console.sol";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

describe("MerkleToken", function () {
  let MerkleTok;
  let merkleToken;
  let accounts;
  let owner;
  let otherAccount;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    otherAccount = accounts[1];

    MerkleTok = await ethers.getContractFactory("MerkleToken");
    merkleToken = await MerkleToken.deploy(MerkleTok.address, 100);
    await merkleToken.deployed();

    console.log("MerkleToken deployed to:", merkleToken.address);
  });

  it("should transfer multiple NFTs", async function () {
    // Mint some NFTs
    const tokenIds = [1, 2, 3];
    const to = [otherAccount.address, otherAccount.address, otherAccount.address];
    await merkleToken.transferMultipleNFT(tokenIds, to);

    // Check if the ownership has changed
    for (let i = 0; i < tokenIds.length; i++) {
      expect(await merkleToken.ownerOf(tokenIds[i])).to.equal(otherAccount.address);
    }
  });

  it("should submit a commit", async function () {
    // Submit a commit
    await merkleToken.submitCommit(42, "secret");

    // Check if the commit is stored correctly
    const commit = await merkleToken.commits(owner.address);
    expect(commit.hash).to.equal("0x1234567890");
    expect(commit.blockNum).to.be.a("number");
    expect(commit.nftID).to.equal(0);
  });

  // Add more test cases...

});
