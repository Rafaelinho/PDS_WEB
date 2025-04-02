import './App.css';
import React from 'react';
import Login from './Login';
import CreateAcc from './CreateAcc';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

let User = {};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAcc />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
