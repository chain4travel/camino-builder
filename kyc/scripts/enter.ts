import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const kyc = await ethers.getContractAt("KYCTest", "0xC581d4b42804Dd489Ba4F0439815186B3B840Bbf")
    await kyc.getIn();
    
    console.log("\n Success \n" );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });