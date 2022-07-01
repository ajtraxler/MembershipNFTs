import './Form.css';
import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input, NumberDecrementStepper, NumberIncrementStepper,
  NumberInput, NumberInputStepper, NumberInputField,
  InputGroup, InputLeftElement, InputRightElement, Heading
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';

import UploadImage from './UploadImage';

function Form() {
  return (
    <div class="formstyle">
      <Heading as='h1' size='xl' textAlign="center">
        Create your Own NFT
      </Heading>
      <br></br>
      <br></br>
      <br></br>

      <FormControl isRequired>
        <FormLabel htmlFor='collectionName'>Name of NFT Collection</FormLabel>
        <Input id='collectionName' type='string' />
        <FormHelperText>What do you want to call your NFT collection?</FormHelperText>
      </FormControl>
      <br></br>
      <br></br>
      <FormControl isRequired>
        <FormLabel htmlFor='creatorName'>Name of Content Creator</FormLabel>
        <Input id='creatorName' type='string' />
        <FormHelperText>Please enter your name.</FormHelperText>
      </FormControl>
      <br></br>
      <br></br>

      <FormControl>
        <FormLabel htmlFor='info'>Utility</FormLabel>
        <Input id='info' type='string' />
        <FormHelperText>Please add information about what extra content NFT holder will have access to.</FormHelperText>
      </FormControl>
      <br></br>
      <br></br>
      <FormControl>
        <FormLabel htmlFor='amount'>Number of NFTs available</FormLabel>
        <NumberInput min={1}>
          <NumberInputField id='amount' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <br></br>
      <br></br>
      <FormControl>
        <FormLabel htmlFor='price'>Price per NFT</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
            children='Ξ'
          />
          <Input id="price" type="number" />
        </InputGroup>
      </FormControl>
      <br></br>
      <br></br>
      <FormControl>
        <FormLabel htmlFor='image'> Upload Your Cover Image</FormLabel>
        <InputGroup>
          <UploadImage></UploadImage>
        </InputGroup>
        <FormHelperText>This image will be the cover of your NFT.</FormHelperText>

      </FormControl>
      <br></br>
      <br></br>
      <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
        Make NFT
      </Button>

    </div>


  )
}

export default Form