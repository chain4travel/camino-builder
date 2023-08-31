// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TicketBooth {
    // Object of the ticket
    IERC721 ticket;
    // mapping of entries
    mapping(address => bool) public hasEntered;

    constructor(address _ticket) {
        // Casting the address of the ticket to an object of IERC721. It allows us to
        // later call function on the object of ticket without the need of explicitly 
        // specifying the type every time
        ticket = IERC721(_ticket);
    }

    function enter() external {
        // Checks if the caller hasn't already entered
        require(!hasEntered[msg.sender], "You have already entered!");

        // Calls the function on your Ticket. Check whether you own an nft
        require(ticket.balanceOf(msg.sender) >= 1, "You need a ticket");

        // adds you to a mapping 
        hasEntered[msg.sender] = true;
    }
}