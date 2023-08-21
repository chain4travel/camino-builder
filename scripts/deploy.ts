import {ethers, upgrades} from "hardhat"
import { Test } from "mocha";

async function main() {
    // Creating an instance of Contract Factory. Think of it as making a blueprint. In line 10
    // we are addressing this blueprint to deploy the actual contract.
    const Ticket = await ethers.getContractFactory("TicketNFT");
    const ticket = await Ticket.deploy();

    await ticket.deployed();

    const Booth = await ethers.getContractFactory("TicketBooth");
    const booth = await Booth.deploy(ticket.address);

    await booth.deployed();

    console.log(
      "Token deployed to:", ticket.address
    )

    console.log(
      "Ticket Booth deployed to", booth.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });