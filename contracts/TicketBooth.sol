// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract TicketBooth {
    IERC1155 ticket;
    mapping(address => bool) public hasEntered;

    constructor(address _ticket) {
        ticket = IERC1155(_ticket);
    }

    function enter() external {
        require(ticket.balanceOf(msg.sender, 1) >= 1, "You need a ticket");
        hasEntered[msg.sender] = true;
    }
}