// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Storage {
    uint256 private number;

    function store(uint256 _number) external {
        number = _number;
    }

    function get() external view returns(uint256) {
        return number;
    }
}

