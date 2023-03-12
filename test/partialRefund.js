const { expect } = require("chai")
const { ethers, network } = require("hardhat")


describe("Testing partial refund contract", () => {

  before(async () => {

    //  provider ???
    const provider = ethers.provider;
    accounts = await ethers.getSigners()
    pr = await ethers.getContractFactory(erc20PartialRefund)

  })
  it("should mint", async () => {
      console.log('user balance pre deposit: ', await provider.getBalance(accounts[0].address))
      tx = await pr.connect(accounts[1]).minting({value: ethers.utils.parseEther('5')})
      await tx.wait()
      console.log('user balance post deposit: ', await provider.getBalance(accounts[0].address))
  })


  it("should withdraw funds", async () => {
      console.log('contract balance: ', await provider.getBalance(pr.address))
      tx = await pr.connect(accounts[0]).withdraw()
      let xtx = await tx.wait()
      console.log(await provider.getBalance(accounts[0].address))
    })


    it("should sell back", async () => {
        console.log('contract balance: ', await provider.getBalance(pr.address))
        const amount = ethers.utils.parseEther("1");
        await token.connect(pr.address).transfer(accounts[0].address, amount);
        const recipientBalance = await token.balanceOf(recipient.address);          // token ????
      })


})
