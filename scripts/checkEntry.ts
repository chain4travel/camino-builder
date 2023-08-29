import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const kyc = await ethers.getContractAt("KYCTest", "0x49500cBaEA9c97717373718c5a5e2170F0Dad34f")
    let entered = await kyc.hasEntered("0xced8ec16e2b4964a834ed996a6d85aa007858bda");

    console.log(entered);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });