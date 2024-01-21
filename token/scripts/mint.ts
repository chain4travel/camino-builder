import {ethers} from "hardhat"

async function main() {
    const deployedToken = await ethers.getContractAt("TestToken", "0x2a5FA0098Bb73DC9322342100f278cAdBf844e42")

    // await deployedToken.transfer("c-chain address", ethers.utils.parseEther("42"));
    await deployedToken.transfer("0xfc0d60d398F083D00117F6cdd665a8B4693Be8a3", ethers.utils.parseEther("15"));


    console.log("Success!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });