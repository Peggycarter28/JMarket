import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Vendors from './pages/vendors'
import ChatVendor from './pages/vendors/ChatVendor'
import ProfileDetailsSettings from './pages/Dashboard/Client/Settings'
import UserProfile from './pages/client/UserProfile'
import ClientHome from './pages/Dashboard/Client/Home'


function App() {
  return (
    <div className="font-custom">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<Home />} />
        <Route path="contact" element={<Home />} />
        <Route path="auth/signin" element={<Login />} />
        <Route path="auth/signup" element={<Register />} />

        <Route path="dashboard/vendor" element={<Home />} />

        <Route path="user/:username" element={<UserProfile />} />

        <Route path="dashboard">
          <Route path='user'>
            <Route path="" element={<ClientHome />} />
            <Route path="chats/:receiverId/:chatId" element={<ChatVendor />} />
            <Route path="chats" element={<ChatVendor />} />
            <Route path="settings/:curr_section" element={<ProfileDetailsSettings />} />
          </Route>

        </Route>

        <Route path="service/:category/:title" element={<Vendors />} />
        <Route path="service/:category/:serviceId/chat" element={<ChatVendor />} />
        <Route path="service/:category/:serviceId/chat/:receiverId/:chatId" element={<ChatVendor />} />
      </Routes>
    </div>
  )
}

export default App
