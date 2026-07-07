import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

   const { logout } = useLogout();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout()
      navigate('/')
   }
   const { user } = useAuthContext()
   return (
      <>
         <div className='bg-indigo-600 flex justify-between px-20 py-4'>
            <Link to='/'
               className='text-3xl font-semibold text-white mt-2'
            >
               Visitor Pass Management System
            </Link>
            <nav className='flex'>
               {!user &&
                  <div className='flex gap-4'>
                     <Link to='/login'
                        className='bg-white px-5 py-3 rounded-lg font-semibold text-indigo-700'
                     >
                        Login
                     </Link>

                     <Link to='/signup'
                        className='bg-white rounded-lg px-2 py-3 text-indigo-700 font-semibold'
                     >
                        Visitor Signup
                     </Link>
                  </div>
               }
               {user &&
                  <div onClick={handleLogout}>
                     <Link
                        className='bg-indigo-200 border-indigo-800 text-indigo-800 rounded-md'
                     >
                        Logout
                     </Link>
                  </div>
               }
            </nav>
         </div>
      </>
   )
}

export default Navbar