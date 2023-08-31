// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./interfaces/IAdmin.sol";

contract KYCTest {
    address constant CAMINO_ADMIN = 0x010000000000000000000000000000000000000a;

    mapping(address => bool) public hasEntered;

    function getIn() public {
        require(IAdmin(CAMINO_ADMIN).getKycState(msg.sender) == 1, "KYC not approved");
        hasEntered[msg.sender] = true;
    }
}