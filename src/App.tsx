import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Top from './Pages/Top';
import Display from './Pages/Display';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/Top" element={<Top />} />
      <Route path="/Display" element={<Display />} />
      <Route path="*" element={<Navigate to="/Top" />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
