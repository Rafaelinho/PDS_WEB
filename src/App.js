import './App.css';
import React from 'react';
import Login from './Login/Login.js';
import CreateAcc from './CreateAcc/CreateAcc.js';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Angariacao from './Angariacao/Angariacao.js';
import LeilaoPage from './Leilão/LeilaoPage.js';
import MeusLeiloes from './Leilão/MeusLeiloes.js';
import Reclamacao from "./Reclamacao/Reclamacao";





function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/leilaopage" element={<LeilaoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAcc />} />
          <Route path="/angariacoes" element={<Angariacao />} />
          <Route path="/meus-leiloes" element={<MeusLeiloes />} />
          <Route path="/reclamacao" element={<Reclamacao />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
