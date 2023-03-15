const { expect } = require("chai")
const { assert } = require("console")
const { ethers } = require("hardhat")
require("@nomicfoundation/hardhat-chai-matchers");

describe("Testing partial refund contract", () => {

  before(async () => {
    accounts = await ethers.getSigners()
    pR = await ethers.getContractFactory("forge")
    pr = await pR.deploy()
    
  })

//   it("should mint tokens when called with enougth ether", async () => {
//     console.log('total supply pre minting ', await pr.totalSupply());
//     console.log('user balance pre minting: ', await pr.balanceOf(accounts[0].address));
//     tx = await pr.minting({value:"1000000000000000000"});
//     await tx.wait()
//     console.log('user post minting: ',await pr.balanceOf(accounts[0].address));
//     console.log('total supply post minting', await pr.totalSupply());
//   })



})


