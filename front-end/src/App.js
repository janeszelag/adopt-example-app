import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import Profile from './Profile'
import { Cat } from 'react-kawaii'

// fix search, make it slightly more complex
// GIF of what I made
// recording intro

function App() {

  return (
    <div className='mx-12 my-6 min-h-screen flex flex-col'>
      <div className='flex items-end border-b border-gray-200 pb-2'>
        <Cat size={60} mood='blissful' color='#a8a29e' />
        <Link to='/'>
          <h1 className='mt-2 text-3xl font-medium leading-7 text-slate-700'>
            Animal Rescue.io
          </h1>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
