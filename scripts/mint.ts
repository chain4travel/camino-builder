import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const deployedToken = await ethers.getContractAt("TestToken", "0x3b4a1f91fa9828D7a09ba94d36ddBC6A8F2eC412")
    // let amountMinted = await deployedToken.mint(addr, amount) as BigNumber;

    // console.log("You have successfully minted", amountMinted)
    await deployedToken.mint("0xced8ec16e2b4964a834ed996a6d85aa007858bda", ethers.utils.parseEther("42"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });