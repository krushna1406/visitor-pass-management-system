import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from "../components/Navbar"

const Home = () => {
  const {user} = useAuthContext();

  if(user?.role === 'admin') return <Navigate to='/admin'/>
  if(user?.role === 'security') return <Navigate to='/security'/>
  if(user?.role === 'employee') return <Navigate to='/employee'/>
  return (
    <div>
      <Navbar />
      <h2>This is Home Page</h2>
    </div>
  )
}

export default Home