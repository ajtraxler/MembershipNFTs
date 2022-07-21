import logo from './logo.svg';
import './App.css';
// import Form from './pages/CreateNFT';
import CreateNFT from './pages/CreateNFT'
import Login from './pages/Login';
import Minting from './pages/Minting';
import Start from './pages/Start';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import FormComponent from './pages/FormComponent';
import Navigation from './pages/Navigation';

// //importing ABI
// import MembershipFactory from '../../../server/artifacts/contracts/MembershipFactory.sol';

// //get contract where it was deployed and dedclare as const
// const membershipFactoryAddress = "0xe9396fD158aa99A5B9c4b725156133D2EAE12D86";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/createNFT" element={<CreateNFT />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/nav" element={<Navigation />} />



      </Routes>
    </BrowserRouter>

  );
}

export default App;
