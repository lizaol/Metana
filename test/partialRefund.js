const { expect } = require("chai")
const { assert } = require("console")
const { ethers } = require("hardhat")
// require("@nomiclabs/hardhat-waffle")

describe("Testing partial refund contract", () => {
  let accounts
  let pR
  let pr
  const totalSupply = (1000* 10 ** 18).toString()
  before(async () => {

    //  provider ???
    //  provider = ethers.provider;
    accounts = await ethers.getSigners()
    pR = await ethers.getContractFactory("erc20partialRefund")
    pr = await pR.deploy()
    
  })

  // it("should assert true", async function (){
  //   await pR.deployed()
  //   return assert.isTrue(true)
  // })
  // it("should mint", async () => {
  //     console.log('user balance pre deposit: ', await ethers.provider.getBalance(accounts[0].address))
  //     console.log('user balance pre deposit: ', await pr.balanceOf(accounts[0].address))
  //     tx = await pr.connect(accounts[1]).minting({value: ethers.utils.parseEther('5')})
  //     await tx.wait()
  //     console.log('user balance post deposit: ', await ethers.provider.getBalance(accounts[0].address))
  //     console.log('user balance post deposit: ', await pr.balanceOf(accounts[0].address))
      
  // })
  it("should mint tokens when called with enough ether and total supply is within limit", async () => {
    console.log('total supply ', await pr.totalSupply());
    console.log('user balance pre deposit: ', await pr.balanceOf(accounts[0].address));

    tx = await pr.minting();
    await tx.wait()
    const finalSupply = await pr.totalSupply();
    console.log('final balance: ',await pr.balanceOf(accounts[0].address));

    // assert.equal(
    //   finalSupply - initialSupply,
    //   1000 * 10 ** await pr.decimals(),
    //   "Token supply should increase by 1000"
    // );
  })

  // it("should revert if called with less than 1 ether", async () => {
  //   // await revert(pr.minting({ from: accounts[0], value: ethers.utils.parseEther('0') }), "Not enouth ether");
  //   await expect(pr.minting({ from: accounts[0], value: ethers.utils.parseEther('0') }))
  //       .to.be.revertedWith('Num should be bigger than 1');
  // });


  // it("Should assign the total supply of tokens to the owner", async function () {
  //   const ownerBalance = await pr.balanceOf(accounts[0].address);
  //   expect(await pr.totalSupply()).to.equal(ownerBalance);
  // });



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


