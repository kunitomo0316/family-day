import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Pages/Top';
import Display from './Pages/Display';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/Top" element={<Top />} />
      <Route path="/Display" element={<Display />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
