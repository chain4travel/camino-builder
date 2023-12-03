// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BYOFuelToken is ERC20, AccessControl {
    // Create a new role identifier for the minter role
    //    mapping(string => mapping(address => uint256)) private flights;
    mapping(string => uint256) private fuelByFlights;

    constructor() ERC20("BYOFuelToken", "BYOF") {
        // Grant the minter role to a specified account
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, 1000 * 10 ** 18);

    }

    function mint(address to, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        // Check that the calling account has the minter role
        _mint(to, amount);
    }

    function claim(address traveller, uint256 amount) public returns (uint256) {
        _mint(traveller, amount * 10 ** decimals());
        return balanceOf(traveller);
    }

    function availableFuelInLiters(address traveller) public view returns (uint256) {
        return balanceOf(traveller);
    }

    function useForFlight(address traveller, uint256 amount, string memory flightNumber) public {
        _burn(traveller, amount * 10 ** 18);
        fuelByFlights[flightNumber] += amount * 10 ** 18;
    }

    function litersUsedForFlight(string memory flightNumber) public view returns (uint256) {
        return fuelByFlights[flightNumber];
    }

}