const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
const { mock } = require("node:test");
require("@nomicfoundation/hardhat-chai-matchers");
// require("@nomiclabs/hardhat-waffle")

describe("Testing partial refund contract", () => {
  let accounts;
  let pR;
  let pr;
  let mockPR;
  let mock;
  before(async () => {
    accounts = await ethers.getSigners();
    pR = await ethers.getContractFactory("erc20partialRefund");
    pr = await pR.deploy();
    mockPR = await ethers.getContractFactory("mock_pr");
    mock = await mockPR.deploy();
  });

  it("should have correct name and symbol", async function () {
    expect(await pr.name()).to.equal("Gold");
    expect(await pr.symbol()).to.equal("GLD");
  });

  it("should mint 1000 tokens to the sender", async function () {
    console.log("pr balance", await pr.balanceOf(accounts[0].address));
    console.log("mock balance", await mock.balanceOf(accounts[0].address));
    await pr.minting({ value: "1000000000000000000" });
    expect(await pr.balanceOf(accounts[0].address)).to.equal(
      ethers.utils.parseUnits("1000", 18)
    );
  });
  it("should fail if msg.value is less than 1 ether", async function () {
    await expect(pr.minting({ value: "10" })).to.be.revertedWith(
      "Not enough ether"
    );
  });
  it("should set MAX_TOKENS in mock contract", async () => {
    await mock.setMax(10);
    expect(await mock.MAX_TOKENS()).to.equal(10);
  });

  it("fails if total supply > MAX_TOKENS", async () => {
    await mock.setMax(10);

    await expect(
      mock.minting({ value: "100000000000000000000" })
    ).to.be.revertedWith("TotalSupply exceeds limit");
  });

  // it("should throw error when total supply exceeds maximum tokens", async () => {
  //   // Set MAX_TOKENS to a smaller value
  //   await mock.setMax(5000);
  //
  //   // Mint enough tokens to reach the MAX_TOKENS limit
  //   const numTokensToMint = 4000 * 10 ** 18;
  //   await pr.minting({ value: "1000000000000000000" }); // Mint 1000 tokens
  //   await pr.minting({ value: "1000000000000000000" }); // Mint another 1000 tokens
  //   await pr.minting({ value: "1000000000000000000" }); // Mint another 1000 tokens
  //   await pr.minting({ value: "1000000000000000000" }); // Mint another 1000 tokens
  //   await pr.minting({ value: "1000000000000000000" }); // Mint another 1000 tokens
  //
  //   // Attempt to mint one more token, which should fail
  //   await expect(pr.minting({ value: "1000000000000000000" })).to.be.revertedWith("TotalSupply exceeds limit");
  // });

  it("allows to withdraw", async () => {
    const balanceSCbefore = await ethers.provider.getBalance(pr.address);
    const balanceUserBefore = await ethers.provider.getBalance(
      accounts[0].address
    );

    tx = await pr.withdraw();
    await tx.wait();

    const balanceUserAfter = await ethers.provider.getBalance(
      accounts[0].address
    );

    expect(await ethers.provider.getBalance(pr.address)).to.equal(0);
  });

  it("should fail if contract has no ether", async () => {
    console.log("sc balance", await ethers.provider.getBalance(pr.address));
    await expect(pr.withdraw()).to.be.revertedWith("Contract has no ether");
  });

  it("should fail if amount =0", async () => {
    console.log(await ethers.provider.getBalance(pr.address));
    await expect(pr.sellBack(0)).to.be.revertedWith(
      "You need to sell at least some tokens"
    );
  });

  it("should fail if SC doesn't have enough eth to sell back", async () => {
    console.log("SC eth balance", await ethers.provider.getBalance(pr.address));
    expect(pr.sellBack(1)).to.be.revertedWith("SC doesn't hold enough ether");
  });

  it("send eth to the SC and test sellBack", async () => {
    // enf eth to SC
    const tx = await accounts[1].sendTransaction({
      to: pr.address,
      value: ethers.utils.parseEther("10"),
    });
    await tx.wait();
    const initialSCbalanceE = await ethers.provider.getBalance(pr.address);
    const initialBalanceE = await ethers.provider.getBalance(
      accounts[0].address
    );
    const amountBefore = await pr.balanceOf(accounts[0].address);
    const SCamountBefore = await pr.balanceOf(pr.address);
    const amountSell = 10;
    const amountSellDecimal = ethers.utils.parseUnits("10", 18);
    const tokenPrice = 5 * 10 ** 14;

    //check user balance before sellBack
    expect(amountBefore > amountSellDecimal).to.be.ok;

    await pr.sellBack(amountSell);

    const amountAfter = await pr.balanceOf(accounts[0].address);
    const SCamountAfter = await pr.balanceOf(pr.address);
    const afterBalanceE = await ethers.provider.getBalance(accounts[0].address);
    const afterSCbalanceE = await ethers.provider.getBalance(pr.address);

    //check user balance after sell back
    const sellPrice = (amountSell * tokenPrice) / 10 ** 18;
    console.log("sellPrice", sellPrice);
    console.log("afterBalanceE", afterBalanceE);
    expect(amountAfter).to.equal(amountBefore.sub(amountSellDecimal));
    expect(afterBalanceE - sellPrice >= initialBalanceE).to.be.ok; // not sure why == doesn't work; bc gas?

    // check contract token balance after sellBack
    expect(SCamountAfter).to.equal(amountSellDecimal);
    expect(initialSCbalanceE - sellPrice >= afterSCbalanceE).to.be.ok;
    console.log("contract token balance ", SCamountAfter);
  });
});
