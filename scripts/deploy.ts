import {ethers, upgrades} from "hardhat"
import { Test } from "mocha";

async function main() {
    // Creating an instance of Contract Factory. Think of it as making a blueprint. In line 10
    // we are addressing this blueprint to deploy the actual contract.
    const Token = await ethers.getContractFactory("FreeToken");
    // Tokens use denomination in decimals, by default it is 18 (e.g. input of 1 * 10 ** 18 = 1 token)
    // ethers.utils.parseEther is basically adding 18 decimals to the number you input.
    const token = await Token.deploy(ethers.utils.parseEther("15"));

    await token.deployed();
    
    const NFT = await ethers.getContractFactory("NFT721")
    const nft = await NFT.deploy()

    const Wizard = await ethers.getContractFactory("InsuranceWizard");
    const wizard = await Wizard.deploy();

    const Manager = await ethers.getContractFactory("RefundManager");
    const manager = await Manager.deploy();

    const Observer = await ethers.getContractFactory("MockObserver");
    const observer = await Observer.deploy(manager.address);
    
    console.log(
      "Token deployed to:", token.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });