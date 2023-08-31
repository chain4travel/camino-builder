import {ethers, upgrades} from "hardhat"
import { Test } from "mocha";

async function main() {
    // Creating an instance of Contract Factory. Think of it as making a blueprint. In line 10
    // we are addressing this blueprint to deploy the actual contract.
    const Token = await ethers.getContractFactory("Token");

    // deploying the token
    const token = await Token.deploy(ethers.utils.parseEther("10"));
    
    await token.deployed();

    const Staking = await ethers.getContractFactory("Staking")
    const staking = await Staking.deploy(token.address, ethers.utils.parseEther("7"));

    await staking.deployed();
    
    console.log(
      "Token deployed to:", token.address
    )

    console.log(
      "Staking deployed to", staking.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });