//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TicketNFT is ERC1155, AccessControl {    
    string public name = "CaminoTicket";
    string public symbol = "CMT";

    constructor() 
        ERC1155(
            "https://gateway.pinata.cloud/ipfs/QmdkTjF2wsxHPdNhpGEqwhy7SjXvkacEEjsMdbgrGzXAmP"
        ) 
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(
        address _to,
        uint256 _amount,
        bytes memory _data
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(_to, 1, _amount, _data);
    }
    
    function burn(address _from , uint amount) external onlyRole(DEFAULT_ADMIN_ROLE){
        _burn(_from, 1 , amount);

    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC1155)
        returns (bool)
    {
        return
            interfaceId == type(IAccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function uri(uint _id) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://gateway.pinata.cloud/ipfs/QmdkTjF2wsxHPdNhpGEqwhy7SjXvkacEEjsMdbgrGzXAmP"
                )
            );
    }
}   
