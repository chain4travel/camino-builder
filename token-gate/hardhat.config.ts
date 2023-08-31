import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import '@openzeppelin/hardhat-upgrades';

dotenv.config();



const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    columbus: {
      url: process.env.COLUMBUS_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;