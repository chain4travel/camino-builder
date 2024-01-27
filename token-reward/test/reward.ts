import {rewardUser} from '../server';

import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { RewardToken } from "../typechain"; // Assuming you have typechain types generated for your contracts

describe("RewardToken contract", function () {
  let RewardToken: Contract;
  let rewardToken: RewardToken;
  let owner: Signer;
  let user: Signer;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const RewardTokenFactory = await ethers.getContractFactory("RewardToken");
    [owner, user] = await ethers.getSigners();

    // Deploy a new contract before each test.
    rewardToken = (await RewardTokenFactory.deploy()) as RewardToken;
    await rewardToken.deployed();
  });

  describe("Reward functionality", function () {
    it("Should reward tokens to a user", async function () {
      // Arrange
      const rewardAmount = ethers.utils.parseUnits("100", 18);

      // Act
      const rewardTx = await rewardToken.connect(owner).reward(await user.getAddress(), rewardAmount);
      await rewardTx.wait();

      // Assert
      const userBalance = await rewardToken.balanceOf(await user.getAddress());
      expect(userBalance).to.equal(rewardAmount);
    });
  });
});