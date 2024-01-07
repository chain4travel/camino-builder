// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT721 is ERC721URIStorage, Ownable {
    constructor() ERC721("MyNFT", "NFT") {}

    /**
    * @dev Function mints tokens, can only be called by owner
    * @param to address the nft is going to be minted to
    * @param tokenId id of the token (can be anything, just must not be minted before within your contract)
    * @param tokenURI a link to a json on some storage (you can set it to an arbitrary string, if you don't want to have)
    */
    function mint(address to, uint256 tokenId, string memory tokenURI) external onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
