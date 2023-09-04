// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Storage {
    // Unsigned integer value, set to 0 until we call store()
    uint256 private number;

    /** 
    * @dev Function called by our accounts to set a number
    */
    function store(uint256 _number) external {
        number = _number;
    }

    /**
    * @dev Function returns number
    */
    function get() external view returns(uint256) {
        return number;
    }
}

