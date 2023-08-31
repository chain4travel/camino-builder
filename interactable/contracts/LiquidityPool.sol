// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract LiquidityPool is AccessControl {
    IERC20 public tokenA;
    IERC20 public tokenB;
    IERC20 public lptoken;

    uint256 public tokenABalance;
    uint256 public tokenBBalance;

    // This liquidity pool contract allows to provide liquidity and exchange tokens. The price ratio is presumed to be 1:1.
    // In order to work with dynamic exchange ratio and pricing additional functionality needs to be provided. There are
    // several ways of handling it, one of the examples being providing a mathematical formula incintivising users to
    // to provide liquidity when the ratio is off and withdraw liquidity when the ratio is on. This would create an example of
    // an AMM contract. Another example would be to use an oracle to provide the exchange rate. There are many other ways.
    // This logic is omitted in here as far as it hardly depends on the use case and is out of scope of this example.

    constructor(IERC20 _tokenA, IERC20 _tokenB) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    /**
    * @dev User adds liquidity to the pool, inputting amounts of both tokens accounting for their respective decimals.
    * After depositing user receives liquidity tokens in return. The ratio of tokens is presumed to be 1:1.
    * @param tokenAAmount Amount of token A to deposit
    * @param tokenBAmount Amount of token B to deposit
    */
    function addLiquidity(uint256 tokenAAmount, uint256 tokenBAmount) external {
        require(tokenA.transferFrom(msg.sender, address(this), tokenAAmount), "Transfer failed");
        require(tokenB.transferFrom(msg.sender, address(this), tokenBAmount), "Transfer failed");

        tokenABalance += tokenAAmount;
        tokenBBalance += tokenBAmount;

        lptoken.mint(msg.sender, tokenAAmount + tokenBAmount);
    }

    /**
    * @dev User removes liquidity from the pool, inputting amount of liquidity tokens.
    * After withdrawing user receives both tokens in return, the lp tokens are burnt. 
    * The ratio of tokens is presumed to be 1:1.
    * @param amount Amount of liquidity tokens to withdraw
    */
    function removeLiquidity(uint256 amount) external {
        uint256 tokenAAmount = amount * tokenABalance / (tokenABalance + tokenBBalance);
        uint256 tokenBAmount = amount * tokenBBalance / (tokenABalance + tokenBBalance);

        require(tokenA.transfer(msg.sender, tokenAAmount), "Transfer failed");
        require(tokenB.transfer(msg.sender, tokenBAmount), "Transfer failed");

        tokenABalance -= tokenAAmount;
        tokenBBalance -= tokenBAmount;
    }

    function withdrawTokenB(uint256 amount) external {
        require(lptoken.balanceOf(msg.sender) >= amount, "Not enough liquidity provided");
        require(tokenB.balanceOf(address(this)) >= amount, "Not enough TokenB :(");

        lptoken.burn(msg.sender, amount);
        IERC20(tokenB).transfer(msg.sender, amount);
    }

    function withdrawTokenA(uint256 amount) external {
        require(lptoken.balanceOf(msg.sender) >= amount, "Not enough liquidity provided");
        require(tokenA.balanceOf(address(this)) >= amount, "Not enough TokenA :(");

        lptoken.burn(msg.sender, amount);
        IERC20(tokenA).transfer(msg.sender, amount);
    }

    function removeLiquidity(uint256 tokenAAmount, uint256 tokenBAmount) external {
        require(lptoken.balanceOf(msg.sender) >= tokenAAmount + tokenBAmount, "Not enough liquidity provided");

        tokenABalance -= tokenAAmount;
        tokenBBalance -= tokenBAmount;

        lptoken.burn(msg.sender, tokenAAmount + tokenBAmount);
        IERC20(tokenA).transfer(msg.sender, tokenAAmount);
        IERC20(tokenB).transfer(msg.sender, tokenBAmount);
    }

    function getTokens() external view returns (address, address) {
        return (address(tokenA), address(tokenB));
    }

    function getExchangeRate() external view returns (uint256) {
        return tokenBBalance * 1e18 / tokenABalance;
    }

    function setLpToken(IERC20 _lptoken) external onlyRole(DEFAULT_ADMIN_ROLE) {
        lptoken = _lptoken;
    }
}