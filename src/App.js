import './App.css';
import React from 'react';
import Login from './Login/Login.js';
import CreateAcc from './CreateAcc/CreateAcc.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Angariacao from './Angariacao/Angariacao.js';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAcc />} />
        <Route path="/angariacoes" element={<Angariacao />} />

      </Routes>
    </BrowserRouter>
    
   // <Angariacao />
  );
}

export default App;
