import React, { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard'
import { getSecurityStats } from '../../services/api'
import TodaysVisitors from './TodaysVisitors'

const SecDashboard = () => {

   const [stats, setStats] = useState({});
   const [todaysVisitors, setTodaysVisitors] = useState([]);

   useEffect(() => {
      const getStats = async () => {
         try {
            const result = await getSecurityStats();
            if (result.success) {
               setStats(result.stats);
               setTodaysVisitors(result.todaysVisitors);
            }
         } catch (error) {
            console.log(error);
         }
      }
      getStats();
   }, [])
   return (
      <>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 mt-10'>
            <DashboardCard name={"Today's Visitors"} value={stats.todaysVisitorsCount} />
            <DashboardCard name={'Visitors Inside'} value={stats.currentlyInside} />
            <DashboardCard name={'Checked Out Today'} value={stats.checkedOutToday} />
         </div>
         <div className='mx-8'>
            <h1 className='mt-6 mb-4 text-indigo-600 font-semibold'>All Visitors</h1>

            {todaysVisitors.map((visitor, index) =>
               <TodaysVisitors key={visitor._id} visitor={visitor} index={index} />
            )}
         </div>
      </>
   )
}

export default SecDashboard