// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Learn more about ERC721 standard: https://docs.openzeppelin.com/contracts/3.x/erc721

contract NFT721 is ERC721, AccessControl, Ownable {
    uint256 tokenCounter;
    
    mapping(uint256 => string) private _URIs;

    constructor() ERC721("PeculiarDonkeys", "PDS") {
        // needed to allign with ids (ids start with 1, while tokenCounter is 0). Further on Counters library will be used instead.
        tokenCounter = 1;
        // AccessControl library function. Grants a role to the deployer of the contract. 
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // Sets link that is going to be the first half of the tokenURI. Second half is initiated in the mint function and is the id to be minted.
        // By understanding what URI does here you can get behind the scenes of pictures popping up on your screens.
        // If you follow the full link you'll see a folder full of pictures that are destined to become NFTs.
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function mint(address _to, string memory _tokenURI)
        public
        onlyRole(OWNER)
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        tokenCounter = tokenCounter + 1;

        return newItemId;
    }

    function _setTokenURI(uint256 id, string memory _tokenURI) internal {
        _URIs[id] = _tokenURI;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return _URIs[id];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IAccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}