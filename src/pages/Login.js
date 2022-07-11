import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';



function Login() {
  // const navigate = useNavigate();
  const handleFunction = async () => {
    console.log("log in");
    // detect ethereum proovider ojbect
    try {
      //find etehr accouont
      window.ethereum.request({ method: "eth_requestAccounts" });
      //declare provier to be 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("le provider", provider);
      //create ethers.js contract insntance loaded up with deployed contract,ABI and signer;
      //const contract= new ethers.Contract(address, abi,provider);
    }

    catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Connect with Your Community</h1>
      <h2>NFT Memberships for Your Content</h2>
      <button onClick={handleFunction}>Login</button>
    </div>
  )
}

export default Login