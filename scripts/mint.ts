import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const deployedToken = await ethers.getContractAt("TestToken", "0x9588B021b8Be39d13B27855aF8AE7c8A1add8151")
    // let amountMinted = await deployedToken.mint(addr, amount) as BigNumber;

    // console.log("You have successfully minted", amountMinted)
    await deployedToken.mint("0xc9df3550f7daeab231d12defb1b7c293d23840fa", ethers.utils.parseEther("25"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });