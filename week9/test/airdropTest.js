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
  // it("should submit a commit and reveal successfully", async function () {
  //   // Submit a commit
  //   await merkleToken.submitCommit(1, "a");

  //   // Get the commit details
  //   const commit = await merkleToken.commits(owner.address);
  //   // const numHash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["uint", "string"], [1, "a"]));
  //   console.log("hash: ", commit.hash)
  //   // Advance to the PublicSale stage
  //   await merkleToken.nextStage();

  //   // Reveal with the same number and secret
  //   await merkleToken.reveal(1, "a");

  // });
  it("should submit a commit and reveal", async function () {
    // Submit a commit
    await merkleToken.submitCommit(1, "a");
    const numHash = ethers.utils.keccak256(1, "a");
    const commit = await merkleToken.commits(owner.address);
    console.log(numHash)
    console.log("commit.hash: ",commit.hash)
    expect(merkleToken.commits(owner).hash === numHash)

    await merkleToken.nextStage()
    console.log("stage", await merkleToken.stage())
    for (let i = 0; i < 11; i++) {
      await network.provider.send("evm_mine");
    }
    const proof = [
      '0x00314e565e0574cb412563df634608d76f5c59d9f817e85966100ec1d48005c0',
      '0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63',
      '0x90a5fdc765808e5a2e0d816f52f09820c5f167703ce08d078eb87e2c194c5525',
      '0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6'
    ];
    
    await merkleToken.reveal(1, "a", proof);
    const ownerOfNFT = await merkleToken.ownerOf(commit.nftID);
    console.log("ownerOfNFT", ownerOfNFT)
    expect(ownerOfNFT).to.equal(owner.address);
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
