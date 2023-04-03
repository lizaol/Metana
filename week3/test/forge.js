const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
const constants = require("./constants");
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
  let accounts;
  before(async () => {
    accounts = await ethers.getSigners();

    const erc1155Factory = await ethers.getContractFactory("erc1155");
    erc1155Deployed = await erc1155Factory.deploy();

    forgeFactory = await ethers.getContractFactory("forge");
    forge = await forgeFactory.deploy(erc1155Deployed.address);

    // await forge.deployed();
  });

  it("timer check", async () => {
    await expect(
      forge.forging(accounts[0].address, GOLD, 10)
    ).to.be.revertedWith("Not enough time passed");
  });

  // fail trade FN (gold, silver, hammer)
  it("fails to trade 1 Gold", async function () {
    await expect(forge.trade(accounts[0].address, GOLD, 1)).to.be.revertedWith(
      "You don't have gold"
    );
  });
  it("fails to trade 1 Silver", async function () {
    await expect(
      forge.trade(accounts[0].address, SILVER, 1)
    ).to.be.revertedWith("You don't have silver");
  });
  it("fails to trade 1 Hammer", async function () {
    await expect(
      forge.trade(accounts[0].address, THORS_HAMMER, 1)
    ).to.be.revertedWith("You don't have hammer");
  });

  // Forging FN
  it("should fail forging if id>6", async function () {
    await expect(forge.forging(accounts[0].address, 7, 1)).to.be.revertedWith(
      "Item doesn't exist"
    );
  });

  it("should fail forging Sword if gold=0", async function () {
    await expect(
      forge.forging(accounts[0].address, SWORD, 1)
    ).to.be.revertedWith("You don't have gold");
  });

  it("should fail forging Loki's Horns if gold=0", async function () {
    await expect(
      forge.forging(accounts[0].address, LOKIS_HORNS, 1)
    ).to.be.revertedWith("You don't have gold");
  });

  it("should fail forging Potion if gold=0", async function () {
    await expect(
      forge.forging(accounts[0].address, POTION, 1)
    ).to.be.revertedWith("You don't have gold");
  });

  it("forge 10 Gold", async function () {
    // increase the blockchain time by 61 seconds
    await ethers.provider.send("evm_increaseTime", [61]);
    await ethers.provider.send("evm_mine", []);
    const result = await forge.forging(accounts[0].address, GOLD, 10);
    await result.wait();
    expect(await erc1155Deployed.balanceOf(accounts[0].address, GOLD)).to.equal(
      10
    );
    console.log(
      "gold balance : ",
      await erc1155Deployed.balanceOf(accounts[0].address, GOLD)
    );
  });

  it("should fail forging Potion if silver=0", async function () {
    await expect(
      forge.forging(accounts[0].address, POTION, 1)
    ).to.be.revertedWith("You don't have silver");
  });

  it("should fail forging Loki's Horns if hammer=0", async function () {
    await expect(
      forge.forging(accounts[0].address, LOKIS_HORNS, 1)
    ).to.be.revertedWith("You don't have hammer");
  });

  it("should fail forging Sword if silver=0", async function () {
    await expect(
      forge.forging(accounts[0].address, SWORD, 1)
    ).to.be.revertedWith("You don't have silver");
    console.log(
      "silver balance : ",
      await erc1155Deployed.balanceOf(accounts[0].address, SILVER)
    );
  });

  it("should fail forging Shield if silver=0", async function () {
    await expect(
      forge.forging(accounts[0].address, SHIELD, 1)
    ).to.be.revertedWith("You don't have silver");
  });

  it("forge 11 Silver", async function () {
    const result = await forge.forging(accounts[0].address, SILVER, 11);
    await result.wait();
    expect(
      await erc1155Deployed.balanceOf(accounts[0].address, SILVER)
    ).to.equal(11);
    console.log(
      "silver balance : ",
      await erc1155Deployed.balanceOf(accounts[0].address, SILVER)
    );
  });

  it("should fail forging Shield if hammer=0", async function () {
    await expect(
      forge.forging(accounts[0].address, SHIELD, 1)
    ).to.be.revertedWith("You don't have hammer");
  });

  it("should fail forging Potion if hammer=0", async function () {
    await expect(
      forge.forging(accounts[0].address, POTION, 1)
    ).to.be.revertedWith("You don't have hammer");
  });

  it("forge 12 Thor's Hammer", async function () {
    const result = await forge.forging(accounts[0].address, THORS_HAMMER, 12);
    await result.wait();
    expect(
      await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER)
    ).to.equal(12);
    console.log(
      "hammer balance : ",
      await erc1155Deployed.balanceOf(accounts[0].address, THORS_HAMMER)
    );
  });

  it("forge 13 Sword", async function () {
    const result = await forge.forging(accounts[0].address, SWORD, 13);
    await result.wait();
    expect(
      await erc1155Deployed.balanceOf(accounts[0].address, SWORD)
    ).to.equal(13);
    console.log(
      "sword balance sword: ",
      await erc1155Deployed.balanceOf(accounts[0].address, SWORD)
    );
    console.log(
      "user balance gold: ",
      await erc1155Deployed.balanceOf(accounts[0].address, GOLD)
    );
    console.log(
      "user balance silver: ",
      await erc1155Deployed.balanceOf(accounts[0].address, SILVER)
    );
  });

  it("forge 14 Sheild", async function () {
    const result = await forge.forging(accounts[0].address, SHIELD, 14);
    await result.wait();
    expect(
      await erc1155Deployed.balanceOf(accounts[0].address, SHIELD)
    ).to.equal(14);
    console.log(
      "shield balance : ",
      await erc1155Deployed.balanceOf(accounts[0].address, SHIELD)
    );
    console.log(
      "user balance gold: ",
      await erc1155Deployed.balanceOf(accounts[0].address, GOLD)
    );
    console.log(
      "user balance silver: ",
      await erc1155Deployed.balanceOf(accounts[0].address, SILVER)
    );
  });

  it("forge 15 Loki's Horns", async function () {
    const result = await forge.forging(accounts[0].address, LOKIS_HORNS, 15);
    await result.wait();
    expect(
      await erc1155Deployed.balanceOf(accounts[0].address, LOKIS_HORNS)
    ).to.equal(15);
  });

  it("forge 10 Potion", async () => {
    const result = await forge.forging(accounts[0].address, POTION, 10);
    await result.wait();
    await expect(
      await erc1155Deployed.balanceOf(accounts[0].address, POTION)
    ).to.equal(10);
    console.log(
      "user balance potion: ",
      await erc1155Deployed.balanceOf(accounts[0].address, POTION)
    );
  });

  // trade function
  it("trade all Sheilds", async function () {
    const shields = await erc1155Deployed.balanceOf(
      accounts[0].address,
      SHIELD
    );
    console.log("shield balance before: ", shields);
    const result = await forge.trade(accounts[0].address, SHIELD, shields - 1);
    await result.wait();
    console.log("shield balance after: ", shields);
  });

  it("fails to trade 1 Sheild", async function () {
    await expect(
      forge.trade(accounts[0].address, SHIELD, 1)
    ).to.be.revertedWith("You don't have shields");
  });

  it("trade all Loki's Horns", async function () {
    const horns = await erc1155Deployed.balanceOf(
      accounts[0].address,
      LOKIS_HORNS
    );
    const result = await forge.trade(
      accounts[0].address,
      LOKIS_HORNS,
      horns - 1
    );
    await result.wait();
  });

  it("fails to trade 1 Loki's Horn", async function () {
    await expect(
      forge.trade(accounts[0].address, LOKIS_HORNS, 1)
    ).to.be.revertedWith("You don't have loki's horns");
  });

  it("trade all Potion", async function () {
    const potions = await erc1155Deployed.balanceOf(
      accounts[0].address,
      POTION
    );
    const result = await forge.trade(accounts[0].address, POTION, potions - 1);
    await result.wait();
  });

  it("fails to trade 1 Potion", async function () {
    await expect(
      forge.trade(accounts[0].address, POTION, 1)
    ).to.be.revertedWith("You don't have potion");
  });

  it("trade Gold (burn gold-mint silver)", async function () {
    console.log(
      "gold balance before: ",
      await erc1155Deployed.balanceOf(accounts[0].address, GOLD)
    );
    const result = await forge.trade(accounts[0].address, GOLD, 5);
    await result.wait();
    console.log(
      "gold balance after: ",
      await erc1155Deployed.balanceOf(accounts[0].address, GOLD)
    );
    console.log(
      "silver balance after: ",
      await erc1155Deployed.balanceOf(accounts[0].address, SILVER)
    );
  });

  it("trade Silver (burn silver-mint hammer)", async function () {
    const result = await forge.trade(accounts[0].address, SILVER, 1);
    await result.wait();
  });

  it("trade Thor's Hammer (burn hammer-mint silver and gold)", async function () {
    const result = await forge.trade(accounts[0].address, THORS_HAMMER, 1);
    await result.wait();
  });

  it("should support ERC1155 interface", async function () {
    const interfaceId = "0x4e2312e0";
    expect(await forge.supportsInterface(interfaceId)).to.be.true;
  });

  // it('onERC1155Received', async function () {
  //   await expect(forge.onERC1155Received(accounts[0].address, accounts[0].address,GOLD, 1, '')).to.be.revertedWith("You don't have gold");
  //
  // });
  it("should allow to receive ERC1155 tokens", async function () {
    // bytes32 constant ZERO_BYTES32 = bytes32(0);
    // Mint 1 Gold token and send it to the forge contract
    await erc1155Deployed
      .connect(accounts[0].address)
      .mint(forge.address, GOLD, 1, constants.bytes32);

    // Check the balance of the forge contract before the transfer
    const balanceBefore = await erc1155Deployed.balanceOf(forge.address, GOLD);

    // Call onERC1155Received function
    await expect(
      forge.onERC1155Received(
        owner.address,
        user1.address,
        GOLD,
        1,
        constants.ZERO_BYTES32
      )
    ).to.not.be.reverted;

    // Check the balance of the forge contract after the transfer
    const balanceAfter = await erc1155Deployed.balanceOf(forge.address, GOLD);

    // Check that the balance of the forge contract has decreased by 1
    expect(balanceAfter).to.equal(balanceBefore.sub(BigNumber.from(1)));
  });
});
