import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FirstUse from './pages/firstuse/firstuse'
import Games from './pages/Games/Games'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstUse />} />
         <Route path="Games" element={<Games />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

