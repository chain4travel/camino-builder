import {ethers, upgrades} from "hardhat"
import { Test } from "mocha";

async function main() {
    // Creating an instance of Contract Factory. Think of it as making a blueprint. In line 10
    // we are addressing this blueprint to deploy the actual contract.
    const KYC = await ethers.getContractFactory("KYCTest");
    // Tokens use denomination in decimals, by default it is 18 (e.g. input of 1 * 10 ** 18 = 1 token)
    // ethers.utils.parseEther is basically adding 18 decimals to the number you input.
    const kyc = await KYC.deploy();

    await kyc.deployed();
    
    console.log(
      "KYC deployed to:", kyc.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });