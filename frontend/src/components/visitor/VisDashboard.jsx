import React, { useEffect, useState } from 'react'
import { getVisitorStats } from '../../services/api';
import DashboardCard from '../DashboardCard';

const VisDashboard = () => {
   const [stats, setStats] = useState({});

   useEffect(() => {
      const fetchVisitorStats = async () => {
         try {
            const result = await getVisitorStats()
            if (result.success) {
               setStats(result.stats);
            }
         }catch(error) {
            console.log(error.response?.data?.message);
         }
      }
      fetchVisitorStats();
   }, [])

   return (
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mx-8 mt-10'>
         <DashboardCard name={'Approved Visits'} value={stats.approved}/>
         <DashboardCard name={'Pending Visits'} value={stats.pending}/>
         <DashboardCard name={'Rejected Visits'} value={stats.rejected}/>
         <DashboardCard name={'Total Visits'} value={stats.totalVisits}/>
      </div>
   )
}

export default VisDashboard