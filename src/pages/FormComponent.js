import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
// import upload from '../apiServices/upload';
//importing ABI
import { create } from 'ipfs-http-client';
import Membership2 from './artifacts/contracts/Membership2.sol/Membership';
import { ethers } from 'ethers';

const client = create('https://ipfs.infura.io:5001/api/v0')
//get contract where it was deployed and dedclare as const
// const membershipFactoryAddress = "0xe9396fD158aa99A5B9c4b725156133D2EAE12D86";




function FormComponent() {
  const [fileUrl, updateFileUrl] = useState(``);
  const [metaUrl, updateMetaUrl] = useState(``);
  const [nftName, setNftName] = useState(``);
  const [creatorN, setCreatorN] = useState(``);
  const [descriptionN, setDescriptionN] = useState(``);
  const [quantityN, setQuantityN] = useState(0);
  const [priceN, setPriceN] = useState(0);
  const [quantN, setQuantN] = useState(0);
  const [hash, setHash] = useState("");
  const [symbolN, setSymbolN] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  // const state = location.state;




  //helper function
  async function deployNewNFT(_name, _symbol, _URI, _cost, _maxMintAmount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    console.log(signer, "sgner form");


    try {
      //works previous
      const factory = new ethers.ContractFactory(Membership2.abi, Membership2.bytecode, signer);
      const contract = await factory.deploy(nftName, symbolN, metaUrl, priceN, quantityN);
      await contract.deployed();
      console.log("contract address new factory", contract.address);

      return contract.address;


      //nwe ty
    }
    catch (err) {
      console.log(err);

    }
  }

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log(url);
      return url;
    }
    catch (err) {
      console.log(err);
    }
  }

  async function uploadMetaData(metaD) {
    try {
      const added = await client.add(metaD);
      const mUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateMetaUrl(mUrl);
      console.log("metaUrl", mUrl);
      return mUrl;

    }
    catch (err) {
      console.log(err);
    }

  }

  async function submitHandlerForm(e) {
    e.preventDefault();
    const nftName = document.getElementById('formNFTName').value;
    setNftName(nftName);
    const creatorName = document.getElementById('formCreatorName').value;
    setCreatorN(creatorName);
    const description = document.getElementById('info').value;
    setDescriptionN(description);
    const quantity = document.getElementById('quantity').value;
    setQuantityN(quantity);
    // setQuantN(e.target.quantity.value);
    const price = document.getElementById('price').value;
    setPriceN(price);
    const symbol = document.getElementById('formSymbolName').value;
    setSymbolN(symbol);
    console.log(nftName, creatorName, description, quantity, price, symbol);

    // //according to NFT standard on opensea
    const metaData = {
      name: nftName,
      description: description,
      image: fileUrl,
      attributes: [
        {
          "trait_type": "quantity",
          "value": quantity
        },
        {
          "trait_type": "creator",
          "value": creatorName
        }
      ]
    };

    const metaJSON = JSON.stringify(metaData);
    console.log(metaJSON);

    const metaCDI = await uploadMetaData(metaJSON);
    // console.log("metadata", metaData);
    // console.log("all single values", nftName, creatorN, descriptionN, quantityN, priceN, quantN);
    // console.log("now call smart contract");
    const newHash = await deployNewNFT(nftName, symbol, metaCDI, price, quantity);
    console.log("new hash", newHash);
    const metaDataAndHash = {
      name: nftName,
      description: description,
      image: fileUrl,
      hash: newHash,
      CDI: metaCDI,
      cost: price,
      symbol: symbol,
      attributes: [
        {
          "trait_type": "quantity",
          "value": quantity
        },
        {
          "trait_type": "creator",
          "value": creatorName
        }
      ]

    };

    console.log(metaDataAndHash);
    navigate('../minting', { state: { metaDataAndHash } });


    //update all states for ssmart contrtact call







  }



  return (
    <div>
      <Form onSubmit={submitHandlerForm}>
        <Form.Group className="mb-3" >
          <Form.Label>Name of Your NFT Collection</Form.Label>
          <Form.Control type="string" id="formNFTName" />
          <Form.Text className="text-muted">
            What you want your NFT Collection to be called.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>NFT Symbol</Form.Label>
          <Form.Control type="string" id="formSymbolName" />
          <Form.Text className="text-muted">
            Choose 3 letter abbreviaton for your NFT.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Upload Image For NFT</Form.Label>
          <Form.Control type="file" onChange={onChange} id="input" />
          {/* <Form.Text className="text-muted">
      
            </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Name of Content Creator</Form.Label>
          <Form.Control type="string" id="formCreatorName" />
          <Form.Text className="text-muted">
            The name of the collection creator.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Info About What NFT gives holders access to.</Form.Label>
          <Form.Control type="string" id="info" />
          <Form.Text className="text-muted">
            What are the perks of holding your NFT?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Number of NFTs</Form.Label>
          <Form.Control type="number" id="quantity" />
          <Form.Text className="text-muted">
            Total quantity of NFTs for this collection.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Price per NFT in ether</Form.Label>
          <Form.Control type="number" step="0.01" min="0.00" max="1000.00" id="price" />
          <Form.Text className="text-muted">
            Price per NFT.
          </Form.Text>
        </Form.Group>



        <br></br>

        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default FormComponent;