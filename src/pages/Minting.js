import React from 'react'
import Navigation from './Navigation'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


function Minting() {
  const location = useLocation();
  const state = location.state;
  console.log(state.metaData, "this iss the state creator name");
  const data = state.metaData;
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className='formBody'>
        <br></br>
        <div class="text-center bg-light card" >
          <img src={data.image} class="card-img-top" />
          <br></br>
          <br></br>
          <h1>{data.name} by {data.attributes[1].value}</h1>
          <h5>Info: {data.description}</h5>
          <h5>Total number of NFTS: {data.attributes[0].value}</h5>

          <br></br>
          <br></br>

          <Button>Mint the Drop!</Button>
        </div>
      </div>
    </div>
  )
}

export default Minting