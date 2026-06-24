import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

   const {logout} = useLogout();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout()
      navigate('/')
   }
   const { user } = useAuthContext()
   return (
      <>
         <div className='bg-violet-200 flex justify-between px-20 py-4'>
            <Link to='/'
               className='text-2xl font-semibold text-violet-900'
            >
               Visitor Pass Management System
            </Link>
            <nav className='flex'>
               {!user &&
                  <Link to='/login'
                     className='bg-white px-3 py-2 rounded-md font-semibold text-violet-500'
                  >
                     Login
                  </Link>
               }
               {user &&
                  <div onClick={handleLogout}>
                     <Link
                        className='bg-violet-200 border-violet-800 text-violet-800 rounded-md'
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