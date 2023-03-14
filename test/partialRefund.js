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

  it("should mint tokens when called with enougth ether", async () => {
    console.log('total supply pre minting ', await pr.totalSupply());
    console.log('user balance pre minting: ', await pr.balanceOf(accounts[0].address));
    tx = await pr.minting({value:"1000000000000000000"});
    await tx.wait()
    console.log('user post minting: ',await pr.balanceOf(accounts[0].address));
    console.log('total supply post minting', await pr.totalSupply());
  })

  it("check if total supply < MAX_TOKENS", async () => {
    console.log('total supply', await pr.totalSupply());
    await expect(await pr.totalSupply()< 1000000 * 10 ** 18).to.be.ok;
  })

  it("check if contract has ether", async () =>{
    console.log('contract balance: ', await ethers.provider.getBalance(pr.address))
    const transactionHash = await accounts[0].sendTransaction({
      to: pr.address,
      value: ethers.utils.parseEther("1"), 
    });
    await transactionHash.wait()
    await expect(await ethers.provider.getBalance(pr.address) > 0).to.be.ok;
  })

  it("allows to withdraw", async () => {
    console.log('user balance pre withdraw: ', await ethers.provider.getBalance(accounts[0].address));
    console.log('contract balance pre withdraw: ', await ethers.provider.getBalance(pr.address));
    tx = await pr.withdraw();
    await tx.wait()
    console.log('user balance post withdraw: ', await ethers.provider.getBalance(accounts[0].address));
    console.log('contract balance post withdraw: ', await ethers.provider.getBalance(pr.address));
  })

  it("check if the SC has enougth eth to sellBack", async () => {
    console.log('contract balance: ', await ethers.provider.getBalance(pr.address))
    await expect(await ethers.provider.getBalance(pr.address) > 0).to.be.ok;
  })

  it("send eth to the SC and test sellBack", async () => {
    const tx = await accounts[1].sendTransaction({
      to: pr.address,
      value: ethers.utils.parseEther("10"), 
    });
    await tx.wait()
    console.log('contract balance before: ', await ethers.provider.getBalance(pr.address))
    console.log('contract token balance before: ', await pr.balanceOf(pr.address))
    const amount = 1;
    sell = await pr.sellBack(amount);
    await sell.wait()
    console.log('contract balance after: ', await ethers.provider.getBalance(pr.address))
    console.log('contract token balance after: ', await pr.balanceOf(pr.address))
    console.log('user balance: ', await ethers.provider.getBalance(accounts[0].address))
    console.log('user token balance: ', await pr.balanceOf(accounts[0].address))         
  })


})


