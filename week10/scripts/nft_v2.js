const { ethers, upgrades } = require("hardhat")

const PROXY = "0x5AD415b5F81A5eF06649662d491E46190e71eEDC"

async function main(){
    const NFTV2 = await ethers.getContractFactory("erc721UpV2")
    const nftV2 = await upgrades.upgradeProxy(PROXY, NFTV2)     //0x6d5d6dead5eb03f31a4d2efe97f9b5357cb49c3f
    console.log('nft721V2 deployed to:', nftV2.address); 
}

main()