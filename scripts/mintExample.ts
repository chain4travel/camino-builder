import {ethers} from hardhat;

async function main () {
    const NFT = ethers.getContractAt(INFT, addr)
    const Id = await NFT.mint(yourAddress, id, amount)

    console.log("Congratulations! You are now the owner of NFT", ${Id})
}