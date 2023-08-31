// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IInsuranceWizard {
    function calculatePayout(address _user, bytes32 _flightId, uint256 status, uint256 delay) external view returns (uint256);
    function getSubscribers(bytes32 _flightId) external view returns (address[] memory);
}