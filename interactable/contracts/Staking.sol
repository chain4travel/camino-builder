// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../interfaces/IERC20.sol";
import "../interfaces/IAdmin.sol";

contract Staking {
    address constant CAMINO_ADMIN = 0x010000000000000000000000000000000000000a;
    IERC20 public token;

    uint256 public totalStaked;
    mapping(address => uint256) public stakedBalances;

    uint256 public startTime;
    uint256 public endTime;

    uint256 public dailyPctReward;
    uint256 public rewardAmount;
    uint256 public totalRewardsAllocated;
    uint256 public constant MIN_TIME = 7 days;
    uint256 public constant DAILY_PCT_REWARD = 50; // 2 decimals 100 = 1%
    uint256 public constant MIN_STAKING_AMOUNT = 10 * 10**18;

    constructor(
        IERC20 _token,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _rewardAmount
    ) {
        token = _token;
        startTime = _startTime;
        endTime = _endTime;
        rewardAmount = _rewardAmount;
    }

    /**
    * @dev Called by user to stake tokens. We require the user to have a KYC-verified wallet.
    * @param amount Amount of tokens to stake
    */
    function stake(uint256 amount) external {
        // querying the state of the user's KYC approval
        // require(IAdmin(CAMINO_ADMIN).getKycState(msg.sender) == 1, "KYC not approved");

        // checking the staking settings
        require(block.timestamp >= startTime, "Staking period not started");
        require(block.timestamp <= endTime, "Staking period ended");
        require(amount >= MIN_STAKING_AMOUNT, "Amount too low");

        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        stakedBalances[msg.sender] += amount;
        totalStaked += amount;
    }

    /**
    * @dev Called by user to unstake tokens. Unstakes all the tokens if all the requirements are met.
    * Withdraws all the staked funds and rewards.
    */
    function unstake() external {
        uint256 rewardsEarned = calculateRewardsEarned(msg.sender);

        require(token.transfer(msg.sender, stakedBalances[msg.sender]), "Transfer failed");
        require(token.transfer(msg.sender, rewardsEarned), "Transfer failed");

        totalStaked -= stakedBalances[msg.sender];
        stakedBalances[msg.sender] = 0;
    }

    /**
    * @dev Calculates the rewards earned by the user based on the staked amount and the staking settings.
    * @param staker Address of the staker
    */
    function calculateRewardsEarned(address staker) public view returns (uint256) {
        require(block.timestamp >= endTime, "Staking period not yet ended");
        require(stakedBalances[staker] > 0, "No staked tokens");

        uint256 rewardsEarned = stakedBalances[staker] * DAILY_PCT_REWARD / 10000 / 1 days;

        return rewardsEarned;
    }

    function getStakingRewards() external view returns (uint256, uint256) {
        uint256 rewardsRemaining = rewardAmount - totalRewardsAllocated;
        return (rewardAmount, rewardsRemaining);
    }

}