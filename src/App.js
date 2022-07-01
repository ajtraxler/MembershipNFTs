import logo from './logo.svg';
import './App.css';
import Form from './pages/Form';
import Login from './pages/Login';
import Minting from './pages/Minting';
import Start from './pages/Start';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Minting" element={<Minting />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
