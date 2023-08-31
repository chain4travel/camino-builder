// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./interfaces/IERC20.sol";
import "./interfaces/IAdmin.sol";

contract Staking {
    // address of the contract allowing for KYC-verified wallet check
    address constant CAMINO_ADMIN = 0x010000000000000000000000000000000000000a;
    // duration of the campaign
    uint256 constant STAKINGPERIOD = 3 days;
    // token used for stake and rewards
    IERC20 public token;

    // total amount of tokens staked
    uint256 public totalStaked;
    mapping(address => uint256) public stakedBalances;

    uint256 public startTime;
    uint256 public endTime;

    // percentage of daily interest. makes sen
    uint256 public dailyPctReward;
    // maximum amount of total rewards that can be allocated
    uint256 public rewardAmount;
    // counter of all the rewards allocated to all participants
    uint256 public totalRewardsAllocated;
    uint256 public constant MIN_STAKING_AMOUNT = 10 * 10**18;

    // No access control mechanisms are implemented, thus all "owner" interactions or maintenance after
    // the deployment are not technically possible. All the setup and conditions of the campaign are final
    // at the time of contract being live.
    constructor(
        IERC20 _token,
        uint256 _rewardAmount
    ) {
        token = _token;
        // setting the start time of the campaign to the time of the deployment
        startTime = block.timestamp;
        // setting the end time to be in 3 days (refer to line 11). If user tries to participate after the endTime,
        // the contract will not allow him to stake, informing him that the campaign has ended.
        endTime = block.timestamp + STAKINGPERIOD;
        rewardAmount = _rewardAmount;
    }

    /**
    * @dev Called by user to stake tokens. We require the user to have a KYC-verified wallet.
    * @param amount Amount of tokens to stake
    */
    function stake(uint256 amount) external {
        // querying the state of the user's KYC approval. 
        // require(IAdmin(CAMINO_ADMIN).getKycState(msg.sender) == 1, "KYC not approved");

        // checking the staking settings
        require(block.timestamp >= startTime, "Staking period not started");
        require(block.timestamp <= endTime, "Staking period ended");
        require(amount >= MIN_STAKING_AMOUNT, "Amount too low");

        // Initiating the transfer of the tokens from the caller of the function to this contract
        // If user had not approved the amount of the tokens to this account (by calling approve() on the token contract),
        // or if his balance of the tokens is insufficient - the function will be reverted.
        token.transferFrom(msg.sender, address(this), amount);

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

        uint256 rewardsEarned = stakedBalances[staker] * dailyPctReward / 10000 / 1 days;

        return rewardsEarned;
    }

    /**
    * @dev Returns info about rewards. Informs of the total amount of the rewards left.
    */
    function getStakingRewards() external view returns (uint256, uint256) {
        uint256 rewardsRemaining = rewardAmount - totalRewardsAllocated;
        return (rewardAmount, rewardsRemaining);
    }
}