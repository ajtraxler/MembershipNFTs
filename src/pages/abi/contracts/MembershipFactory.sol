//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Membership is ERC721, Ownable {
    uint256 public _tokenIds;
    string baseURI;
    string baseExtension = ".json";
    uint256 public cost;
    uint256 public maxMintAmount;

    //evneent new mint

    constructor(string memory _name, string memory _symbol)
        public
        ERC721(_name, _symbol)
    {}

    function mintNewToken() public payable returns (uint256) {
        require(_tokenIds + 1 <= maxMintAmount, "Sold out");
        require(msg.value >= cost, "Not enough ETH");
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _safeMint(msg.sender, newItemId); //lets see if this work as atm ttrying to point all to same thing
        return newItemId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
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
            bytes(currentBaseURI).length > 0
                ? string(abi.encodePacked(currentBaseURI, baseExtension))
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

contract MembershipFactory {
    struct CreatedContract {
        Membership nft;
        address creator;
        string symbol;
        string name;
    }

    CreatedContract[] public createdMemberships;

    event MembershipCreated(
        address indexed contractAdress,
        string tokenName,
        string tokenSymbol
    );

    function createMembership(
        string memory _tokenName,
        string memory _tokenSymbol
    ) public {
        Membership nft = new Membership(_tokenName, _tokenSymbol);
        CreatedContract memory newContract;

        newContract.nft = nft;
        newContract.creator = msg.sender;
        newContract.name = _tokenName;
        newContract.symbol = _tokenSymbol;

        createdMemberships.push(newContract);
        emit MembershipCreated(address(nft), _tokenName, _tokenSymbol);
        //return newContract;
    }
}
