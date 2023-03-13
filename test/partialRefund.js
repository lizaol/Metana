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

    //  provider ???
    //  provider = ethers.provider;
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
    console.log('total supply post minting', await pr.totalSupply());
    await expect(await pr.totalSupply()< 1000000 * 10 ** 18).to.be.ok;
  })


  // it("should withdraw funds", async () => {
  //     console.log('contract balance: ', await provider.getBalance(pr.address))
  //     tx = await pr.connect(accounts[0]).withdraw()
  //     let xtx = await tx.wait()
  //     console.log(await provider.getBalance(accounts[0].address))
  //   })


  //   it("should sell back", async () => {
  //       console.log('contract balance: ', await provider.getBalance(pr.address))
  //       const amount = ethers.utils.parseEther("1");
  //       await token.connect(pr.address).transfer(accounts[0].address, amount);
  //       const recipientBalance = await token.balanceOf(recipient.address);          // token ????
  //     })


})


