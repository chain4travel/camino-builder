// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAdmin {
  function getKycState(address user) external view returns (uint256);
}