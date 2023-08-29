import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const kyc = await ethers.getContractAt("KYCTest", "contractadd")
    let entered = kyc.hasEntered("address");

    console.log(entered);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });