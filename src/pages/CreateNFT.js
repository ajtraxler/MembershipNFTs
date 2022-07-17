import React from 'react'
import Navigation from './Navigation';
import FormComponent from './FormComponent';
import './CreateNFT.css';
// import upload from '../apiServices/upload';


function CreateNFT() {
  return (
    <div>
      <Navigation />


      <div class="bgColor">
        <div class="formBody">
          <FormComponent />
        </div>

      </div>
    </div>


  )
}

export default CreateNFT;