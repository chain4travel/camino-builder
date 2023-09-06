import { BigNumber } from "ethers";
import {ethers} from "hardhat"

// This is a template of a script, which should help you write your own script. If something is not clear - feel free to reach out in Discord.
async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const target = await ethers.getContractAt("Target", "address")

    await contract.fund("youraddress", args);

    console.log("Success")!
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
