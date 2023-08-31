// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IRefundHandler.sol";

contract MockObserver is AccessControl {
    address public refundHandler;

    mapping(bytes32 => uint256) public recentFlightStatus; 

    // Contract allows anyone to play around with different simulated calls.
    constructor(address _refundHandler) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        refundHandler = _refundHandler;
    }

    /**
    * @notice Calls the refund handler contract with the flight status and delay
    * @param _flightId flight id
    * @param _status flight status
    * @param _delay flight delay
    */
    function callHandler(bytes32 _flightId, uint256 _status, uint256 _delay) public {
        recentFlightStatus[_flightId] = _status;

        if (_status == 0 || _status == 1) {
            // Trigger the refund function in the RefundHandler contract
            // (bool success, ) = refundHandler.call(abi.encodeWithSignature("refund(bytes32,uint256,uint256)", _flightId, _status, _delay));
            // require(success, "Refund failed");
            IRefundHandler(refundHandler).refund(_flightId, _status, _delay);

        } else if (_status == 2) {
            // Handle the case when flight successfully landed
            // (bool success, ) = refundHandler.call(abi.encodeWithSignature("completeFlight(bytes32)", _flightId));
            // require(success, "Refund failed");
            IRefundHandler(refundHandler).completeFlight(_flightId);
        } else {
            revert ("Flight status not supported");
        }
    }

    /** 
    * @dev Mocked function to simulate a flight data cycle. Real environment would create a request via Chainlink.
    * Then after the flight is finalised the chainlink node calls the fulfill function, which exetues the rest of the logic.
    * This function makes a simulation of all these steps in 1 call.
    */
    function createRequest(bytes32 _flightId) external returns (uint256, uint256) {
        uint256 delay;
        // Using block.timestamp as a substance for a random number is very bad, please don't be like me
        uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 3;
        if (randomnumber == 1) {
            delay = randomDelay();
        }
        callHandler(_flightId, randomnumber, delay);
        // Arbitrary timestamps for the flight departure and arrival
        return (block.timestamp + 3 hours, block.timestamp + 72 hours);
    }

    // If the status is delayed, then return a random delay time in range (0 - 12 hours)
    function randomDelay() private view returns (uint) {
        return ((uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 12 + 1) * 3600);
    }
}
