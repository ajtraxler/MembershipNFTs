import React from 'react'
import Navigation from './Navigation'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./Minting.css"
import { ethers } from 'ethers';
import MembershipFactory from "./abi/MembershipFactory.json";


function Minting() {
  const location = useLocation();
  const state = location.state;
  console.log(state, "state");
  console.log(state.metaDataAndHash, "metaand hash")
  const data = state.metaDataAndHash;
  const contractAddress = data.hash;
  console.log(contractAddress);

  async function onMint() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x9b555557D259a30cCB5B0e8E44D27C144F93F0BC", MembershipFactory.abi, signer);

    try {

      const cont = await contract.connect(signer)._tokenIds();
      console.log("signed and connected", cont);
      return cont;

    }
    catch (err) {
      console.log(err);

    }

  }

  return (
    <div class='overall'>
      <div>
        <Navigation />
      </div>
      <div className='formBody position-relative'>
        <br></br>
        <div class="text-center bg-light card pads">
          <img src={data.image} class="card-img-top" />
          <br></br>
          <h3 class="card-title">{data.name} by {data.attributes[1].value}</h3>
          <div class="card-text"><b>Info :</b> {data.description}</div>
          <br></br>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Total number of NFTS :</b> {data.attributes[0].value}</li>
            <li class="list-group-item"><b>Creator :</b> {data.attributes[1].value}</li>
          </ul>
          {/* <br></br>
          <br></br> */}

          <Button onClick={onMint}>Mint the Drop!</Button>
        </div>
      </div>
    </div >
  )
}

export default Minting