import { useState } from 'react'
import './App.css'
import Home from './component/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
