import {ethers, upgrades} from "hardhat"
import { Test } from "mocha";

async function main() {
    // Creating an instance of Contract Factory. Think of it as making a blueprint. In line 10
    // we are addressing this blueprint to deploy the actual contract.
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy(); // 3 * 10 ** 18

    await storage.deployed();
    
    console.log(
      "Storage deployed to:", storage.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });