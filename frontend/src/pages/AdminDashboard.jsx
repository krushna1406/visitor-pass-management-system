import React, { useEffect, useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import CreateUser from '../components/admin/CreateUser'
import UserList from '../components/admin/UserList'
import VisitorList from '../components/admin/VisitorList'
import DashboardCard from '../components/DashboardCard'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import {getDashboardStats} from '../services/api'

const AdminDashboard = () => {
   const [activeTab, setActiveTab] = useState('dashboard')
   const [showProfile, setShowProfile] = useState(false);
   const [stats, setStats] = useState({});

   const {user} = useAuthContext()
   const {logout} = useLogout()
   const navigate = useNavigate();

   const handleLogout = () => {
      logout()
      navigate('/')
   }

   useEffect(() => {
      const getStats = async () => {
         try{
            const result = await getDashboardStats();
            if(result.success) {
               setStats(result.stats);
            }
         }catch(error) {
            // console.log(error.message);
         }
      }
      getStats();
   }, [])

   return (
      <div className='min-h-screen grid grid-cols-[1fr_4fr] bg-gray-100'>
         <div className='bg-white border-r border-gray-200'>
            <Sidebar setActiveTab={setActiveTab} />
         </div>

         <div>
            <header className='h-15 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow'>
               <h1 className='text-2xl font-semibold text-gray-600'>Admin Dashboard</h1>

               {/* Profile Dropdown */}
               <div
                  onClick={() => setShowProfile(prev => !prev)}
                  className='relative'
               >
                  <p className='w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold cursor-pointer'>A</p>

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
            {activeTab === 'dashboard' &&
               <div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 mt-10'>
                     <DashboardCard name={'Total Employees'} value={stats.totalEmployee} />
                     <DashboardCard name={'Total Visitors'} value={stats.totalVisitors}  />
                     <DashboardCard name={'Pending Visitors'} value={stats.pending}  />
                  </div>
               </div>
            }
            {activeTab === 'create-user' && <CreateUser className='bg-white rounded-xl shadow-sm p-6' />}
            {activeTab === 'users' && <UserList className='bg-white rounded-xl shadow-sm p-6' />}
            {activeTab === 'visitors' && <VisitorList className='bg-white rounded-xl shadow-sm p-6' />}
         </div>
      </div>
   )
}

export default AdminDashboard