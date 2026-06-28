import React, { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard'
import { getSecurityStats } from '../../services/api'

const Dashboard = () => {

   const [stats, setStats] = useState({});

   useEffect(() => {
      const getStats = async () => {
         try {
            const result = await getSecurityStats();
            // console.log(result.stats)
            if (result.success) {
               setStats(result.stats);
            }
         } catch (error) {
            console.log(error);
         }
      }
      getStats();
   }, [])
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 mt-10'>
         <DashboardCard name={'Approved Visitors'} value={stats.approved} />
         <DashboardCard name={'Checked In Visitors'} value={stats.checkedIn} />
         <DashboardCard name={'Checked Out Visitors'} value={stats.checkedOut} />
      </div>
   )
}

export default Dashboard