// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {ITarget} from "./interfaces/ITarget.sol";

contract Attacker {
    ITarget target;

    constructor(address _target) {
        target = ITarget(_target);
    }

    function attack() public {
    }
}