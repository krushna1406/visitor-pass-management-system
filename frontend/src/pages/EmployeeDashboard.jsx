import React, { useEffect, useState } from 'react'
import Sidebar from '../components/employee/Sidebar'
import useLogout from '../hooks/useLogout';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import {LogOut } from 'lucide-react'

const EmployeeDashboard = () => {
   const [showProfile, setShowProfile] = useState(false);

   const { user } = useAuthContext();
   const { logout } = useLogout();
   const navigate = useNavigate();

   useEffect(() => {
      const handleClickOutsidde = (e) => {
         setShowProfile(false); 
      }
      document.addEventListener('click', handleClickOutsidde);
      return () => {
         document.removeEventListener('mousedown', handleClickOutsidde);
      }
   }, [])

   const handleLogout = () => {
      logout();
      navigate('/');
   }

   return (
      <div className='min-h-screen grid grid-cols-[1fr_4fr] bg-gray-100'>
         <div className='bg-white border-r border-gray-200'>
            <Sidebar />
         </div>
         <div>
            <header className='h-15 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow'>
               <h1 className='text-2xl font-semibold text-gray-600'>Employee Dashboard</h1>

               <div
                  onClick={(e) => {
                     e.stopPropagation();
                     setShowProfile(prev => !prev)
                  }}
                  className='relative'
               >
                  <p className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer'>{user.email.charAt(0).toUpperCase()}</p>

                  {showProfile &&
                     <div
                        className='absolute right-0 top-12 w-60 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 scale-90'
                     >
                        <p className="text-lg text-blue-500 capitalize">
                           {user.role}
                        </p>
                        <p className="text-sm text-gray-900 overflow-hidden break-all mt-1">{user.email}</p>
                        <hr className="my-3 text-blue-300" />

                        <button
                           onClick={handleLogout}
                           className="w-full flex gap-2 pl-8 hover:bg-red-50 text-red-500 rounded-sm py-2"
                        >
                           <LogOut size={18} className='translate-y-0.5'/>Logout
                        </button>
                     </div>
                  }
               </div>
            </header>

            <Outlet />
         </div>
      </div>
   )
}

export default EmployeeDashboard