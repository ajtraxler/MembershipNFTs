import React from 'react';
import Navigation from './Navigation'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Start.css'


function Start() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const handlerFunction = () => {
    navigate("../createNFT");

  }

  return (
    <div >
      <Navigation />
      <div class="designStart">
        <h1>Create your Personal NFT Membership</h1>
        {/* <br></br> */}
        <h3>Click below to start</h3>
        <br></br>

        <Button variant="primary" onClick={handlerFunction} >Start</Button>
      </div>
    </div>
  )
}

export default Start