import React, { useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import CreateUser from '../components/admin/CreateUser'
import UserList from '../components/admin/UserList'
import Visitors from '../components/admin/Visitors'
import DashboardCard from '../components/DashboardCard'

const AdminDashboard = () => {
   const [activeTab, setActiveTab] = useState('dashboard')

   return (
      <div className='min-h-screen grid grid-cols-[1fr_4fr] bg-gray-100'>
         <div className='bg-white border-r border-gray-200'>
            <Sidebar setActiveTab={setActiveTab} />
         </div>

         <div>
            <header className='h-15 bg-white border-b border-gray-200 flex items-center justify-between px-8'>
               <h1 className='text-2xl font-semibold text-gray-800'>Admin Dashboard</h1>
               <p className='w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold'>A</p>
            </header>
            {activeTab === 'dashboard' &&
               <div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-8 mt-10'>
                     <DashboardCard name={'Total Employees'} value={0} />
                     <DashboardCard name={'Total Visitors'} value={4} />
                     <DashboardCard name={'Pending Visitors'} value={2} />
                  </div>
               </div>
            }
            {activeTab === 'create-user' && <CreateUser className='bg-white rounded-xl shadow-sm p-6' />}
            {activeTab === 'users' && <UserList className='bg-white rounded-xl shadow-sm p-6' />}
            {activeTab === 'visitors' && <Visitors className='bg-white rounded-xl shadow-sm p-6' />}
         </div>
      </div>
   )
}

export default AdminDashboard