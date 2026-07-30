import React, { useState, useEffect } from 'react'
import DashboardCard from '../DashboardCard'
import { getDashboardStats } from '../../services/api';

const Dashboard = () => {
   const [stats, setStats] = useState({});

   useEffect(() => {
      const getStats = async () => {
         try {
            const result = await getDashboardStats();
            if (result.success) {
               setStats(result.stats);
            }
         } catch (error) {
            // console.log(error.message);
         }
      }
      getStats();
   }, [])

   return (
      <div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 mt-10'>
            <DashboardCard name={'Total Employees'} value={stats.totalEmployee} />
            <DashboardCard name={'Total Visitors'} value={stats.totalVisitors} />
            <DashboardCard name={'Pending Visitors'} value={stats.pending} />
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 mt-10'>
            <DashboardCard name={"Today's Visitors"} value={stats.todaysVisitors} />
            <DashboardCard name={'Visitors Inside'} value={stats.currentlyInside} />
            <DashboardCard name={'Checked Out Visitors'} value={stats.checkedOutToday} />
         </div>
      </div>
   )
}

export default Dashboard