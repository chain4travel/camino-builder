import {ethers} from "hardhat"

async function main() {
    // const deployedToken = await ethers.getContractAt("BYOFuelToken", "0xac99BD65905A8ed3dC98d268Dd70932faE11C539")
    const Token = await ethers.getContractFactory("BYOFuelToken");
    const token = await Token.deploy()

    await token.mint("0xced8ec16e2b4964a834ed996a6d85aa007858bda", ethers.utils.parseEther("100"));

    let balance = await token.balanceOf("0xced8ec16e2b4964a834ed996a6d85aa007858bda");

    console.log("token address is", token.address)
    console.log("balance is", balance)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });