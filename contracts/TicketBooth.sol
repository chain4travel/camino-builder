// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;


contract TicketBooth {
    address private nftTicket = "";
    uint256 public IdKey = 42;
    
    mapping (address => bool) passed;

    constructor() {
    }

    function validateTicker() external returns(bool) {
        require(msg.sender == IERC1155(nftTicket).ownerOf(42));

        passed[msg.sender]=true;

        return true;
    }
}