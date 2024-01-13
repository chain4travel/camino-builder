// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Random {

  uint256 lastHash;
  // Seed to "improve" randomness
  uint256 SEED = 37829173892173892173892719837219837298173981739821;
  uint256 winsInARow;

  function roll(bool _guess) external returns (bool) {
    uint256 blockValue = uint256(blockhash(block.number - 1));

    if (lastHash == blockValue) {
      revert();
    }

    
    uint256 round = blockValue / SEED;
    bool result = round == 1 ? true : false;
    lastHash = blockValue;

    if (result == _guess) {
      winsInARow++;
      return true;
    } else {
      result = 0;
      return false;
    }
  }
}