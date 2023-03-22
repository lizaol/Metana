const { expect } = require("chai")
const { assert } = require("console")
const { ethers } = require("hardhat")
require("@nomicfoundation/hardhat-chai-matchers");
// require("@nomiclabs/hardhat-waffle")

describe("Testing partial refund contract", () => {
  let accounts
  let pR
  let pr
  before(async () => {
    accounts = await ethers.getSigners()
    pR = await ethers.getContractFactory("erc20partialRefund")
    pr = await pR.deploy()
    
  })
  it("should have correct name and symbol", async function () {
    expect(await pr.name()).to.equal("Gold");
    expect(await pr.symbol()).to.equal("GLD");
  });

  // it("check if total supply < MAX_TOKENS", async () => {
  //   console.log('total supply', await pr.totalSupply());
  //   await expect(await pr.totalSupply()< 1000000 * 10 ** 18).to.be.ok;
  // })

  // it("should not mint more tokens than MAX_TOKENS", async function () {
  //   // Set total supply to MAX_TOKENS
  //   await pr._mint(accounts[0].address, ethers.utils.parseUnits("1000000", 18));

  //   // Try to mint more tokens
  //   await expect(owner.sendTransaction({
  //       to: erc20.address,
  //       value: ethers.utils.parseEther("")
  //   })).to.be.revertedWith("TotalSupply exceeds limit");
  // });

  it("should fail if msg.value is less than 1 ether", async function () {
    await expect(pr.minting({ value: "10" })).to.be.revertedWith("Not enouth ether");
  });

  it("should mint 1000 tokens to the sender", async function () {
    await pr.minting({ value: "1000000000000000000" });
    await expect(await pr.balanceOf(accounts[0].address)).to.equal(ethers.utils.parseUnits('1000', 18));
  });

  it("check if contract has ether", async () =>{
    // const transactionHash = await accounts[0].sendTransaction({
    //   to: pr.address,
    //   value: ethers.utils.parseEther("1"), 
    // });
    // await transactionHash.wait()
    console.log(await ethers.provider.getBalance(pr.address))
    await expect(await ethers.provider.getBalance(pr.address) > 0).to.be.ok;
  })

  it("allows to withdraw", async () => {
    tx = await pr.withdraw();
    await tx.wait()
    await expect(await ethers.provider.getBalance(pr.address)).to.equal(0);
  })

  it("should fail if amount =0", async () => {
    console.log(await ethers.provider.getBalance(pr.address))
    await expect(pr.sellBack(0)).to.be.revertedWith("You need to sell at least some tokens");
  })

  it("should fail if SC doesn't have enough eth to sell back", async () => {
    await expect(pr.sellBack(1)).to.be.revertedWith("SC doesn't hold enough ether");
  })

  it("send eth to the SC and test sellBack", async () => {
    // enf eth to SC
    const tx = await accounts[1].sendTransaction({
      to: pr.address,
      value: ethers.utils.parseEther("10"), 
    });
    await tx.wait()
    const initialSCbalanceE = await ethers.provider.getBalance(pr.address)
    const initialBalanceE = await ethers.provider.getBalance(accounts[0].address)
    const amountBefore = await pr.balanceOf(accounts[0].address)
    const SCamountBefore = await pr.balanceOf(pr.address)
    const amountSell = 10;
    const amountSellDecimal = ethers.utils.parseUnits("10", 18)
    console.log("SCamountBefore ", SCamountBefore )

    //check user token balance before sellBack
    expect(amountBefore > amountSellDecimal).to.be.ok;

    await pr.sellBack(amountSell)

    const amountAfter = await pr.balanceOf(accounts[0].address)
    const SCamountAfter = await pr.balanceOf(pr.address)
    const afterBalanceE = await ethers.provider.getBalance(accounts[0].address)
    const afterSCbalanceE = await ethers.provider.getBalance(pr.address)

    //check user token balance after sell back
    expect(amountAfter).to.equal(amountBefore.sub(amountSellDecimal))

    // check contract token balance after sellBack
    expect(SCamountAfter).to.equal(amountSellDecimal)
    console.log("contract token balance ", SCamountAfter )      
  })


})


