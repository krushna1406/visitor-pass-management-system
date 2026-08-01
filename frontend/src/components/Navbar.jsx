import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {

   const { logout } = useLogout();
   const navigate = useNavigate();
   const [sidebarOpen, setSidebarOpen] = useState(false);

   const handleLogout = () => {
      logout()
      navigate('/')
   }
   const { user } = useAuthContext()

   return (
      <>
         <div className='fixed top-0 left-0 w-full bg-white/10 border-b-2 border-white/5 backdrop-blur-md flex justify-between items-center px-6 md:px-20 py-4 z-50'>
            <Link to='/'
               className='flex gap-3 md:gap-5 text-2xl md:text-3xl font-semibold text-slate-900 drop-shadow-md mt-2'
            >
               <img src="https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/d6cddfc9-adb3-4da7-99c1-d9cba2f86562.png" alt="VisitDesk Logo"
                  className='w-8 h-8 md:w-10 md:h-10 rounded-4xl'
               />
               VisitDesk
            </Link>

            {/* Desktop nav */}
            <nav className='hidden md:flex'>
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

            {/* Hamburger button — mobile only */}
            <button
               className='md:hidden text-slate-900 p-2 rounded-lg hover:bg-white/20 transition-colors'
               onClick={() => setSidebarOpen(true)}
               aria-label='Open menu'
            >
               <Menu size={28} />
            </button>
         </div>

         {/* Mobile sidebar overlay */}
         {sidebarOpen && (
            <div
               className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden'
               onClick={() => setSidebarOpen(false)}
            />
         )}

         {/* Mobile sidebar */}
         <div
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
               ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
         >
            {/* Sidebar header */}
            <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200'>
               <span className='text-xl font-bold text-slate-800'>Menu</span>
               <button
                  onClick={() => setSidebarOpen(false)}
                  className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600'
                  aria-label='Close menu'
               >
                  <X size={24} />
               </button>
            </div>

            {/* Sidebar links */}
            <div className='flex flex-col gap-3 px-6 py-6'>
               {!user && (
                  <>
                     <Link
                        to='/login'
                        onClick={() => setSidebarOpen(false)}
                        className='flex items-center gap-3 bg-blue-50 text-blue-700 font-semibold px-4 py-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors'
                     >
                        Login
                     </Link>

                     <Link
                        to='/signup'
                        onClick={() => setSidebarOpen(false)}
                        className='flex items-center gap-3 bg-blue-50 text-blue-700 font-semibold px-4 py-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors'
                     >
                        Visitor Signup
                     </Link>
                  </>
               )}
               {user && (
                  <button
                     onClick={() => { handleLogout(); setSidebarOpen(false); }}
                     className='flex items-center gap-3 bg-red-50 text-red-600 font-semibold px-4 py-3 rounded-lg border border-red-200 hover:bg-red-100 transition-colors'
                  >
                     Logout
                  </button>
               )}
            </div>
         </div>
      </>
   )
}

export default Navbar