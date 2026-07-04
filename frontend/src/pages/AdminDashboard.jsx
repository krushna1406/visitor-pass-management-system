import React, { useEffect, useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import useLogout from '../hooks/useLogout'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminDashboard = () => {
   const [showProfile, setShowProfile] = useState(false);

   const {user} = useAuthContext()
   const {logout} = useLogout()
   const navigate = useNavigate();

   const handleLogout = () => {
      logout()
      navigate('/')
   }

   return (
      <div className='min-h-screen grid grid-cols-[1fr_4fr] bg-gray-100'>
         <div className='bg-white border-r border-gray-200'>
            <Sidebar/>
         </div>

         <div>
            <header className='h-15 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow'>
               <h1 className='text-2xl font-semibold text-gray-600'>Admin Dashboard</h1>

               {/* Profile Dropdown */}
               <div
                  onClick={() => setShowProfile(prev => !prev)}
                  className='relative'
               >
                  <p className='w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold cursor-pointer'>A</p>

                  {showProfile &&
                     <div
                        className='absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50'
                     >
                        <p className="font-semibold text-gray-700">{user.email}</p>

                        <p className="text-sm text-gray-500 capitalize">
                           {user.role}
                        </p>

                        <hr className="my-3 text-gray-300" />

                        <button
                           onClick={handleLogout}
                           className="w-full bg-red-400 hover:bg-red-500 text-white rounded-lg py-2"
                        >
                           Logout
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

export default AdminDashboard