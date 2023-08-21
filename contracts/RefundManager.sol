// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IObserverSub} from "../interfaces/IObserverSub.sol";
import "../interfaces/IInsuranceWizard.sol";
import "hardhat/console.sol";

contract RefundManager is AccessControl{
    IObserverSub public flightObserver;
    IInsuranceWizard public wizard;
    IERC20 public token;

    mapping (bytes32 => uint256) public flightStatus; // 0 - not started, 1 - in progress, 2 - completed

    /**
    * Then grants DA role to Observer
    * Deployed observer sets up MockObserver
    */
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
    * @dev Processes the info, refunds users whose subscriptions meet the conditions
    */
    function refund(bytes32 _flightId, uint256 _status, uint256 _delay ) external onlyRole(DEFAULT_ADMIN_ROLE){
        address[] memory pep = wizard.getSubscribers(_flightId);
        uint256 payout;
        for (uint i = 0; i < pep.length; i++) {
            payout = wizard.calculatePayout(pep[i], _flightId, _status, _delay);
            token.transfer(pep[i], payout);
        }
    }

    /**
    * @dev Handles flights which were successfully completed
    * @param _flightId flight id
    */
    function completeFlight(bytes32 _flightId) external onlyRole(DEFAULT_ADMIN_ROLE){
        flightStatus[_flightId] = 2;
    }

    function setWizard (address _wizard) external onlyRole(DEFAULT_ADMIN_ROLE){
        wizard = IInsuranceWizard(_wizard);
    }

    function setToken (address _token) external onlyRole(DEFAULT_ADMIN_ROLE){
        token = IERC20(_token);
    }
}