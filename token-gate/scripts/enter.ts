import { BigNumber } from "ethers";
import {ethers} from "hardhat"
import { TicketBooth } from "../typechain";


async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const ticketBooth = await ethers.getContractAt("TicketBooth", "0x9FCe11299C3BD3D62d4f32B0a0506536B351e907") as TicketBooth;

    // Calling the function enter() on TicketBooth contract
    await ticketBooth.enter();

    // Calling hasEntered() on the ticketBooth and assigning this value to entered
    const entered = await ticketBooth.hasEntered();
    console.log("")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });