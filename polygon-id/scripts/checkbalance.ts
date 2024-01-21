import { ethers } from 'hardhat'

async function main() {
    const contract = await ethers.getContractAt("ERC20Verifier", "0x4A16e2a8e8fd6ebd6d396C36C6dbF4366D4724c5")
    const balance = await contract.balanceOf("0xcCE9FbAb786119Bb5A33b0F744f2eC09A92ccBDA")

    console.log("Balance of Daniel is", balance)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });