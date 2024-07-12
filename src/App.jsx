import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  return (
    <div className="font-custom">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="about" element={<Home/>} />
        <Route path="contact" element={<Home/>} />
        <Route path="auth/signin" element={<Login/>} />
        <Route path="auth/signup" element={<Register/>} />

        <Route path="dashboard/vendor" element={<Home/>} />

        <Route path="service/:service-slug" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
