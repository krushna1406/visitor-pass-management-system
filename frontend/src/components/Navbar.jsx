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
         <div className='fixed top-0 left-0 w-full bg-white/10 border-b-2 border-white/5 backdrop-blur-md flex justify-between px-20 py-4'>
            <Link to='/'
               className='flex gap-5 text-3xl font-semibold text-slate-900 drop-shadow-md mt-2'
            >
               <img src="../public/favicon.png" alt="VisitDesk Logo"
                  className='w-10 h-10 rounded-4xl'
               />
               VisitDesk
            </Link>
            <nav className='flex'>
               {!user &&
                  <div className='flex gap-4'>
                     <Link to='/login'
                        className='bg-white px-5 py-3 rounded-lg border-2 border-blue-500 font-semibold text-blue-700'
                     >
                        Login
                     </Link>

                     <Link to='/signup'
                        className='bg-white rounded-lg px-2 py-3 border-2 border-blue-500 text-blue-700 font-semibold'
                     >
                        Visitor Signup
                     </Link>
                  </div>
               }
               {user &&
                  <div onClick={handleLogout}>
                     <Link
                        className='bg-blue-200 border-blue-800 text-blue-800 rounded-md'
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