pragma solidity ^0.8.9;

interface ITarget {
    function deposit() external payable;
    function withdrawAll() external;
}

contract Attack {
    ITarget public immutable target;

    constructor(Itarget _target) {
        target = _target;
    }
    
    receive() external payable {
        if () {
            
        }
    }

    function attack() external payable {
        require();
        target.deposit{value:}();
        target.withdrawAll();
    }

    function getBalance() external view returns (uint256) {
    }
}