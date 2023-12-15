// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Voting {
    uint256 public votesForJohnMorisson;
    uint256 public votesForJerryLawler;

    function voteForJohn() public {
        votesForJohnMorisson++;
    }

    function voteForJerry() public {
        votesForJerryLawler++;
    }

}