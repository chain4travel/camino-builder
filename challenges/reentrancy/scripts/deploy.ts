import {ethers, upgrades} from "hardhat"
import { Test } from "mocha";

async function main() {
  
    const Target = await ethers.getContractFactory("Target");
    const target = await Target.deploy();

    await target.deployed();

    const Attacker = await ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy();

    await attacker.deployed();

    console.log(
      "Attacker deployed to:", ticket.address
    )

    console.log(
      "Target deployed to", booth.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });