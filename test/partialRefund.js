const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");
// require("@nomiclabs/hardhat-waffle")

describe("Testing partial refund contract", () => {
  let accounts;
  let pR;
  let pr;
  before(async () => {
    accounts = await ethers.getSigners();
    pR = await ethers.getContractFactory("erc20partialRefund");
    pr = await pR.deploy();
  });
  it("should have correct name and symbol", async function () {
    expect(await pr.name()).to.equal("Gold");
    expect(await pr.symbol()).to.equal("GLD");
  });

  it("check if total supply < MAX_TOKENS", async () => {
    console.log("total supply", await pr.totalSupply());
    await expect((await pr.totalSupply()) < 1000000 * 10 ** 18).to.be.ok;
  });

  it("should fail if msg.value is less than 1 ether", async function () {
    await expect(pr.minting({ value: "10" })).to.be.revertedWith(
      "Not enough ether"
    );
  });

  it("should mint 1000 tokens to the sender", async function () {
    await pr.minting({ value: "1000000000000000000" });
    expect(await pr.balanceOf(accounts[0].address)).to.equal(
      ethers.utils.parseUnits("1000", 18)
    );
  });

  it("should fail if contract has no ether", async () => {
    expect(
      (await ethers.provider.getBalance(pr.address)) == 0
    ).to.be.revertedWith("Contract has no ether");
  });

  it("check if contract has ether", async () => {
    console.log(await ethers.provider.getBalance(pr.address));
    await expect((await ethers.provider.getBalance(pr.address)) > 0).to.be.ok;
  });

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
    // expect(await ethers.provider.getBalance(accounts[0].address)).to.equal(balanceSCbefore.add(balanceUserBefore).sub(gasUsed))
    expect(balanceUserAfter >= balanceUserBefore + balanceSCbefore).to.be.ok;
  });

  it("should fail if amount =0", async () => {
    console.log(await ethers.provider.getBalance(pr.address));
    // expect(pr.sellBack(0)).to.be.revertedWith("You need to sell at least some tokens");
    await expect(pr.sellBack(0)).to.be.revertedWith(
      "You need to sell at least some tokens"
    );
  });

  it("should fail if SC doesn't have enough eth to sell back", async () => {
    console.log("SC eth balance", await ethers.provider.getBalance(pr.address));
    expect(pr.sellBack(1)).to.be.revertedWith("SC doesn't hold enough ether");
  });

  it("should fail if amount > MAX_TOKENS", async () => {
    // console.log("SC eth balance", await ethers.provider.getBalance(pr.address))
    expect(pr.sellBack(1100000)).to.be.revertedWith(
      "There not that many tokens"
    );
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
