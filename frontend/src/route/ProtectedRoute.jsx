import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const ProtectedRoute = ({children, role}) => {

   const {user, loading} = useAuthContext();

   if(loading) {
      return <div>Loading...</div>
   }
   if(!user) {
      return <Navigate to='/'/>
   }

   if(role && user?.role !== role) {
      return <Navigate to='/'/>
   }
   return children;
}

export default ProtectedRoute