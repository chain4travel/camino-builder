// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("RewardToken", "RTK") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function reward(address to, uint256 amount) external {
        // Add your own access control logic here
        _mint(to, amount);
        emit RewardGiven(to, amount);
    }

    event RewardGiven(address indexed to, uint256 amount);
}