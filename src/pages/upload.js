const ipfsApi = require("ipfs-http-client");
const ipfs = ipfsApi('https://ipfs.infura.io:5001');

//or if you have a local node running
// const ipfs= ipfsApi("http://127/0/0/1:5001")

export default async function ipfsUpload(buffer) {
  const result = await ipfs.add(buffer);
  return `https://gateway.ipfs.io/ipfs/${result.path}`;
}

async function run() {
  //note to self save variables from front end to state
  //there is an attribute standard
  const files = [{
    path: '/',
    content: JSON.stringify({
      name: "abc",
      image: "gateway/ipfs/ettc", //result of ipfsUpload,
      description: ""

    })
  }];

  const result = await ipfs.add(files);
  console.log(result);
}

