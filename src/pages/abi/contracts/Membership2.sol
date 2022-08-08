//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Membership is ERC721URIStorage, Ownable {
    uint256 public _tokenIds;
    string public baseURI;
    string baseExtension = ".json";
    uint256 public cost;
    uint256 public maxMintAmount;

    //evneent new mint

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _URI,
        uint256 _cost,
        uint256 _maxMintAmount
    ) public ERC721(_name, _symbol) {
        baseURI = _URI;
        cost = _cost;
        maxMintAmount = _maxMintAmount;
    }

    // function mintNewToken(string memory _tokenURI)
    //     public
    //     payable
    //     returns (uint256)
    // {
    //     require(_tokenIds + 1 <= maxMintAmount, "Sold out");
    //     require(msg.value >= cost, "Not enough ETH");
    //     _tokenIds++;
    //     uint256 newItemId = _tokenIds;
    //     _mint(msg.sender, newItemId);
    //     _setTokenURI(newItemId, _tokenURI);
    //     return newItemId;
    // }

    //change of mintToken function so that takes URI from above
    function mintNewToken() public payable returns (uint256) {
        require(_tokenIds + 1 <= maxMintAmount, "Sold out");
        require(msg.value >= cost, "Not enough ETH");
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, baseURI);
        return newItemId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI; //added underscore infront of this.. not sure ..
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "token id doees not exist");
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0 //change here is removing .json
                ? string(abi.encodePacked(currentBaseURI))
                : "";
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed");
    }
}
