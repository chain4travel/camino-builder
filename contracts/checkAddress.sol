// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Checker {
    function checkAddress() external view returns(address) {
        return msg.sender;
    }
}