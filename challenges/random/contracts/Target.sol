// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Target {
    // Token used for entry fee and prize
    IERC20 token;
    // Address of the account that can withdraw the accumulated entry fees
    address public owner;
    // Address of the latest winner
    address public winner;
    // Number that is needed to match in order to win
    // @note The visibility is set to public to make the process easier
    // Setting it to private would not make it impossible to read this value, only more complex
    // You can read any value, including private!!! by reading bytecode we can decompile and dissasemble the code
    // and bytecode is public when contract is deployed
    uint256 public secretNumber;

    // Security measure to only allow the token to be set once
    bool tokenSet;

    // Amount of tokens winner is goins to receive
    uint256 constant public PRIZE;
    // Fee each participant needs to pay when calling tryYourLuck()
    uint256 constant public ENTRY_COST = 10 * 10 ** 18;

    constructor() {
        owner = msg.sender;
        token = IERC20(_token);
        // A pseudo-random number 1-10
        secretNumber = block.timestamp % 10;
    }


    function tryYourLuck () external returns(bool) {
        // Initiating the transfer of entry fee from user to this account
        token.transferFrom(msg.sender, address(this), ENTRY_COST);

        // Introducing pseudo-randomness with a variable of block.timestamp in its core
        // If the value matches secretNumber caller wins a prize
        if (block.timstamp * 4 % 10 == secretNumber) {
            winner = msg.sender;
            token.mint(msg.sender, PRIZE);
            return true;
        } else {
            return false;
        }
    }

    function setToken (address _token) {
        require(!tokenSet, "Token already set");
        
        token = _token;
    }
}

