import { ethers } from 'ethers';

function loginConnect() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
}

