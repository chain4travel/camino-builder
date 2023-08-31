import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const deployedContract = await ethers.getContractAt("ContractName", <contractaddr>)

    // call a function on your contract
    returnValue = await deployedContract.function(<argument>, <argument>)

    // output some feedback
    console.log("Somthing happened", returnValue)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });