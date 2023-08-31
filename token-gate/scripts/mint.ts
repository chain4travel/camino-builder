import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const deployedNFT = await ethers.getContractAt("TicketNFT", "address")
    // let amountMinted = await deployedToken.mint(addr, amount) as BigNumber;

    // console.log("You have successfully minted", amountMinted)
    await deployedNFT.mint("youraddress", 3, "url");

    console.log("Success")!
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
