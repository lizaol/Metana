const { expect } = require("chai")
const { assert } = require("console")
const { ethers } = require("hardhat")
require("@nomicfoundation/hardhat-chai-matchers");

describe("Testing partial refund contract", () => {
  let GOLD = 0;
  let SILVER = 1;
  let THORS_HAMMER = 2;
  let SWORD = 3;
  let SHIELD = 4;
  let LOKIS_HORNS = 5;
  let POTION = 6;
  let forgeFactory;
  let forge;
  let erc1155Deployed;
  let accounts
  before(async () => {
    accounts = await ethers.getSigners()

    const erc1155Factory = await ethers.getContractFactory('erc1155');
    erc1155Deployed = await erc1155Factory.deploy();

    forgeFactory = await ethers.getContractFactory('forge');
    forge = await forgeFactory.deploy(erc1155Deployed.address);

    await forge.deployed();

  })

  it("timer check", async () => {
    await expect(
      forge.forging(accounts[0].address, GOLD, 10)
    ).to.be.revertedWith("Not enough time passed");
  })

  it("forge 10 Gold", async function () {
    // increase the blockchain time by 61 seconds
    await ethers.provider.send("evm_increaseTime", [61]);
    await ethers.provider.send("evm_mine", []);
    const result = await forge.forging(accounts[0].address, GOLD, 10);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, GOLD)).to.equal(10);
    console.log('gold balance : ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
  });

  it("forge 11 Silver", async function () {
    const result = await forge.forging(accounts[0].address, SILVER, 11);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, SILVER)).to.equal(11);
    console.log('silver balance : ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));
  });

  it("forge 12 Thor's Hammer", async function () {
    const result = await forge.forging(accounts[0].address, THORS_HAMMER, 12);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER)).to.equal(12);
    console.log('hammer balance : ', await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER));
  });

  it("forge 13 Sword", async function () {
    const result = await forge.forging(accounts[0].address, SWORD, 13);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, SWORD)).to.equal(13);
    console.log('sword balance sword: ', await erc1155Deployed.balanceOf(accounts[0].address, SWORD));
    console.log('user balance gold: ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
    console.log('user balance silver: ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));

  });

  it("forge 14 Sheild", async function () {
    const result = await forge.forging(accounts[0].address, SHIELD, 14);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, SHIELD)).to.equal(14);
    console.log('shield balance : ', await erc1155Deployed.balanceOf(accounts[0].address, SHIELD));
    console.log('user balance gold: ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
    console.log('user balance silver: ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));
  });

  it("forge 15 Loki's Horns", async function () {
    const result = await forge.forging(accounts[0].address, LOKIS_HORNS, 15);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, LOKIS_HORNS)).to.equal(15);
    console.log('horns balance : ', await erc1155Deployed.balanceOf(accounts[0].address, LOKIS_HORNS));
    console.log('user balance gold: ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
    console.log('user balance hammer: ', await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER));
  });

  it("forge 15 Potion", async function () {
    const result = await forge.forging(accounts[0].address, POTION, 15);
    await result.wait()
    expect(await erc1155Deployed.balanceOf(accounts[0].address, POTION)).to.equal(15);
    console.log('potion balance : ', await erc1155Deployed.balanceOf(accounts[0].address, POTION));
    console.log('user balance gold: ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
    console.log('user balance silver: ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));
    console.log('user balance hammer: ', await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER));
  });

// trade function
it("trade 1 Sheild", async function () {
  console.log('shield balance before: ', await erc1155Deployed.balanceOf(accounts[0].address, SHIELD));
  const result = await forge.trade(accounts[0].address, SHIELD, 1);
  await result.wait()
  console.log('shield balance after: ', await erc1155Deployed.balanceOf(accounts[0].address, SHIELD));
});

it("trade 1 Loki's Horns", async function () {
  const result = await forge.trade(accounts[0].address, LOKIS_HORNS, 1);
  await result.wait()
  console.log('horns balance : ', await erc1155Deployed.balanceOf(accounts[0].address, LOKIS_HORNS));
});

it("trade 1 Potion", async function () {
  const result = await forge.trade(accounts[0].address, LOKIS_HORNS, 1);
  await result.wait()
  console.log('potion balance : ', await erc1155Deployed.balanceOf(accounts[0].address, LOKIS_HORNS));
});


  it("trade Gold (burn gold-mint silver)", async function () {
    console.log('gold balance before: ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
    const result = await forge.trade(accounts[0].address, GOLD, 5);
    await result.wait()
    console.log('gold balance after: ', await erc1155Deployed.balanceOf(accounts[0].address, GOLD));
    console.log('silver balance after: ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));

  });

  it("trade Silver (burn silver-mint hammer)", async function () {
    console.log('silver balance before: ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));
    const result = await forge.trade(accounts[0].address, SILVER, 1);
    await result.wait()
    console.log('silver balance after: ', await erc1155Deployed.balanceOf(accounts[0].address, SILVER));
    console.log('hammer balance after: ', await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER));

  });

  it("trade Thor's Hammer (burn hammer-mint silver and gold)", async function () {
    console.log('hammer balance before: ', await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER));
    const result = await forge.forging(accounts[0].address, THORS_HAMMER, 1);
    await result.wait()
    console.log('hammer balance after: ', await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER));
  });

})
