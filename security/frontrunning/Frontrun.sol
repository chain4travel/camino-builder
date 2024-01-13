// SPDX-License-Identifier: MIT

pragma solidity 0.8.12;

contract Frontrun {
    bytes32 public s_secretHash;

    event success();
    event fail();

    constructor(bytes32 secretHash) payable {
        s_secretHash = secretHash;
    }

    function withdraw(string memory password) external payable {
        if (keccak256(abi.encodePacked(password)) == s_secretHash) {
            (bool sent,) = msg.sender.call{value: address(this).balance}("");
            require(success);
            emit success();
        } else {
            emit fail();
        }
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
