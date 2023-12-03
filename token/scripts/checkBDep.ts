import {ethers} from "hardhat"

async function main() {
    const token = await ethers.getContractAt("BYOFuelToken", "0x30308D63625b512CCd0364Bbf400e8acD0DF0180")
    // const Token = await ethers.getContractFactory("BYOFuelToken");
    // const token = await Token.deploy()

    // await token.mint("0xced8ec16e2b4964a834ed996a6d85aa007858bda", ethers.utils.parseEther("100"));
    await token.mint("0xced8ec16e2b4964a834ed996a6d85aa007858bda", ethers.utils.parseEther("150"))
    let balance = await token.balanceOf("0xced8ec16e2b4964a834ed996a6d85aa007858bda");
    let balance1 = await token.availableFuelInLiters("0xced8ec16e2b4964a834ed996a6d85aa007858bda")

    console.log("token address is", token.address)
    console.log("balance is", balance)
    console.log("balance1 is", balance1)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });