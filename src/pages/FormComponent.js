import React from 'react';
import { Form, Button } from 'react-bootstrap';
import upload from '../apiServices/upload';


function FormComponent() {

  function handleFiles() {
    const file = this.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result);
      const gateway = await upload(buffer);
      console.log(gateway);
    };
  }



  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formNFTName">
          <Form.Label>Name of Your NFT Collection</Form.Label>
          <Form.Control type="string" placeholder="Enter collection name." />
          <Form.Text className="text-muted">
            What you want your NFT Collection to be called.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCreatorName">
          <Form.Label>Name of Content Creator</Form.Label>
          <Form.Control type="string" />
          <Form.Text className="text-muted">
            The name of the collection creator.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="info">
          <Form.Label>Info About What NFT gives holders access to.</Form.Label>
          <Form.Control type="string" />
          <Form.Text className="text-muted">
            What are the perks of holding your NFT?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Number of NFTs</Form.Label>
          <Form.Control type="number" />
          <Form.Text className="text-muted">
            Total quantity of NFTs for this collection.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price per NFT in ether</Form.Label>
          <Form.Control type="number" />
          <Form.Text className="text-muted">
            Price per NFT.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="input">
          <Form.Label>Upload Image For NFT</Form.Label>
          <Form.Control type="file" />
          {/* <Form.Text className="text-muted">
      
            </Form.Text> */}
        </Form.Group>

        <br></br>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default FormComponent;