const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");

const whitelist = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
    '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
    // '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
    // '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
    // '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
    // '0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
    // '0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',
    // '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec',
    // '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097',
    // '0xcd3B766CCDd6AE721141F452C550Ca635964ce71',
    // '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
    // '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
    // '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
    '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'];

const whitelistRemix = [
    '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
    '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
    '0x617F2E2fD72FD9D5503197092aC168c91465E7f2'
]

function main() {
    const leaves = whitelist.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true});      // {sortPairs: true} ensures that the leaf nodes and their corresponding hashes are sorted before constructing the Merkle tree
    const rootHash = merkleTree.getRoot().toString('hex');
    console.log(`\nWhitelist Merkle Root: 0x${rootHash}\n`);

    whitelist.forEach((address) => {
        const proof =  merkleTree.getHexProof(keccak256(address));
        const formattedProof = proof.map(p => `'${p}'`).join(',');
        console.log(`Address: ${address} Proof: ${formattedProof}\n`);
        // console.log(`Address: ${address} Proof: '${proof}'\n`);
    });
}
    
main();



// Whitelist Merkle Root: 0x4f8ac46ef7cf1c5274a9be484e75681e2fe6e5070e0fa17f5d2806910d30a124

// Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 Proof: 0x00314e565e0574cb412563df634608d76f5c59d9f817e85966100ec1d48005c0,0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63,0x90a5fdc765808e5a2e0d816f52f09820c5f167703ce08d078eb87e2c194c5525,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 Proof: 0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9,0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63,0x90a5fdc765808e5a2e0d816f52f09820c5f167703ce08d078eb87e2c194c5525,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC Proof: 0x1ebaa930b8e9130423c183bf38b0564b0103180b7dad301013b18e59880541ae,0x070e8db97b197cc0e4a1790c5e6c3667bab32d733db7f815fbe84f5824c7168d,0x90a5fdc765808e5a2e0d816f52f09820c5f167703ce08d078eb87e2c194c5525,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 Proof: 0x8a3552d60a98e0ade765adddad0a2e420ca9b1eef5f326ba7ab860bb4ea72c94,0x070e8db97b197cc0e4a1790c5e6c3667bab32d733db7f815fbe84f5824c7168d,0x90a5fdc765808e5a2e0d816f52f09820c5f167703ce08d078eb87e2c194c5525,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 Proof: 0xe5c951f74bc89efa166514ac99d872f6b7a3c11aff63f51246c3742dfa925c9b,0x0eaf89a9c884bb4179c071971269df40cd13505356686ff2db6e290749e043e5,0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc Proof: 0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b,0x0eaf89a9c884bb4179c071971269df40cd13505356686ff2db6e290749e043e5,0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 Proof: 0xb6711c87f5d70aa0ec9dcbff648cab4ede7aec7218e4e2fef065f83253fc9108,0xa22d2d4af6076ff70babd4ffc5035bdce39be98f440f86a0ddc202e3cd935a59,0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 Proof: 0x93230d0b2377404a36412e26d231de4c7e1a9fb62e227b420200ee950a5ca9c0,0xa22d2d4af6076ff70babd4ffc5035bdce39be98f440f86a0ddc202e3cd935a59,0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6,0x0ad2638c89ef98de7e450ea32c9d37a3db5d4d3634d8d6464dcb20564ad0ccd6

// Address: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 Proof: 0x185622dc03039bc70cbb9ac9a4a086aec201f986b154ec4c55dad48c0a474e23




// Remix:
// Whitelist Merkle Root: 0x53c4e5e25bcbb26b82784b9793d8a74a02719aabab34c2d0358b26231e2f4bbe

// Address: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 Proof: 0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb,0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc

// Address: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 Proof: 0x5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229,0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc

// Address: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db Proof: 0xdfbe3e504ac4e35541bebad4d0e7574668e16fefa26cd4172f93e18b59ce9486,0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc

// Address: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB Proof: 0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54,0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc

// Address: 0x617F2E2fD72FD9D5503197092aC168c91465E7f2 Proof: 0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097