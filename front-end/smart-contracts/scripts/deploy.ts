import { ethers } from "hardhat";

async function main() {
  const Sender = await ethers.getContractFactory("SendCAM")
  const sender = await Sender.deploy()

  await sender.deployed()

  console.log(`Contract deployed to ${sender.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
