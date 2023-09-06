import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {
    // Creating an interactable contract variable.
    // "ContractName" is the Contract/Interface of the contract we want to call (We need to have either the full code or interface compiled)
    //  contractaddr - address of the contract to be called
    const deployedToken = await ethers.getContractAt("TestToken", "0xfc6C0524eD7d89f29A31A5C7595513021D0014eB")
    // let amountMinted = await deployedToken.mint(addr, amount) as BigNumber;

    // console.log("You have successfully minted", amountMinted)
    await deployedToken.mint("0xced8ec16e2b4964a834ed996a6d85aa007858bda", ethers.utils.parseEther("42"));
    // await deployedToken.grantRole(await deployedToken.DEFAULT_ADMIN_ROLE(), "0x534213807869ec2b00cc39ca1f019a20cc11fe33")

    console.log("Success!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });