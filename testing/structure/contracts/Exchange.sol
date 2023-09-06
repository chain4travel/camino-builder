// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ITokenB.sol";

contract Exchange {
    IERC20 public tokenA;
    ITokenB public tokenB;

    mapping(address => bool) public claimed;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = ITokenB(_tokenB);
    }

    function swap(uint256 _amount) public {
        tokenA.transferFrom(msg.sender, address(this), _amount);
        tokenB.mint(msg.sender, _amount);
    }
}