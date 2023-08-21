// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IRefundManager {
    function refund(bytes32 _flightId, uint256 _status, uint256 _delay) external;
    function completeFlight(bytes32 _flightId) external;
}