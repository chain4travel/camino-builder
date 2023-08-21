// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IObserverSub {
    function callHandler(bytes32 _flightId, uint256 _status, uint256 _delay) external;
    function createRequest(bytes32 _flightId) external returns(uint256, uint256);
}
