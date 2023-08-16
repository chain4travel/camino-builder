// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT1155 is ERC1155 {
    string public name = "Pirates";
    string public symbol = "PRT";
    bytes32 public constant OWNER = keccak256(abi.encodePacked("OWNER"));

    constructor()
        ERC1155(
            "https://gateway.pinata.cloud/ipfs/QmWn5BUiq9iRNreeKHQt8MeXPJATBA8Vu3nFf6M4PSJxov/{id}.json"
        )
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OWNER, msg.sender);
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) public {
        _mint(_to, _id, _amount, _data);
    }

    function mintBatch(
        address _to,
        uint256[] memory _id,
        uint256[] memory _amount,
        bytes memory _data
    ) public onlyRole(OWNER) {
        _mintBatch(_to, _id, _amount, _data);
    }

    function uri(uint256 _id) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://gateway.pinata.cloud/ipfs/QmWn5BUiq9iRNreeKHQt8MeXPJATBA8Vu3nFf6M4PSJxov/",
                    Strings.toString(_id),
                    ".json"
                )
            );
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
}
