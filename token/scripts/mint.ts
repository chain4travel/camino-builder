import {ethers} from "hardhat"

async function main() {
    const deployedToken = await ethers.getContractAt("TestToken", "0xfc6C0524eD7d89f29A31A5C7595513021D0014eB")

    await deployedToken.transfer("c-chain address", ethers.utils.parseEther("42"));


    console.log("Success!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });