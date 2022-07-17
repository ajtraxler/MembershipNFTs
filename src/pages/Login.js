import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap';



function Login() {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const handleFunction = async () => {
    console.log("log in");
    // detect ethereum proovider ojbect
    try {
      //find etehr accouont
      window.ethereum.request({ method: "eth_requestAccounts" });
      //declare provier to be 
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      //create ethers.js contract insntance loaded up with deployed contract,ABI and signer;
      //const contract= new ethers.Contract(address, abi,provider);
      navigate('./Start');
    }

    catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="designStart">
      <h1>Connect with Your Community</h1>
      <h2>NFT Memberships for Your Content</h2>
      <Button onClick={handleFunction}>Login</Button>
    </div>
  )
}

export default Login