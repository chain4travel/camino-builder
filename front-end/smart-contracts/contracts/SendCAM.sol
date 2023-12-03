// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SendCAM {
    function transfer(address payable _to, uint256 _amount) external {
        // A preferred way of transferring native currency compared to `.send`
        // Reason for that is gas limit that introduces oportunities for reentrancy (Refer to challanges)
        (bool sent, ) = _to.call{value: _amount}("");
        
        require(sent, "Failed to send CAM");
    }
}
