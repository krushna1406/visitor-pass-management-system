import React, { useState, useEffect } from 'react'
import DashboardCard from '../DashboardCard'
import PendingVisitCard from './PendingVisitCard';
import { getEmployeeDashboardStats, getEmployeeVisitors } from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useVisitorContext } from '../../hooks/useVisitorContext';

const EmpDashboard = () => {
   const [stats, setStats] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [pendings, setPendings] = useState([]);

   const { user } = useAuthContext();
   const { visitors, dispatch } = useVisitorContext();

   useEffect(() => {
      const getStats = async () => {
         try {
            const result = await getEmployeeDashboardStats(user._id);
            if (result.success) {
               setStats(result.stats)
            }
         } catch (error) {
            console.log(error.message);
         }
      }
      getStats();

      const getPending = async () => {
         setLoading(true)
         setError(null)
         try {
            const result = await getEmployeeVisitors();
            if (result.success) {
               const pendingVisitors = result.visitors.filter(visitor =>
                  visitor.status === 'pending'
               )
               dispatch({ type: 'SET_VISITORS', payload: pendingVisitors })
            }
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      getPending();
   }, [])
   return (
      <div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 mt-10'>
            <DashboardCard name={'Total Visits'} value={stats.totalVisits} />
            <DashboardCard name={'Upcoming Visitors'} value={stats.upcomingVisitors} />
            <DashboardCard name={'Pending visitors'} value={stats.pending} />
         </div>
         <section className='m-6 mt-8'>
            <h2 className='text-lg text-gray-700'>Pending Visitors</h2>

            {loading ? (
               <div className='text-gray-400 mt-5 ml-10 text-md'>Loading.....</div>
            ) : error ? (
               <div className='text-red-500 mt-5 ml-10 text-md'>{error}</div>
            ) : !visitors.length ? (
               <div className='text-lg text-gray-400 ml-25 mt-10'>
                  No pending visitors
               </div>
            ) : (
               <div className='flex'>
                  {visitors.map(visitor =>
                     <PendingVisitCard key={visitor._id} visitor={visitor} loading={loading} error={error} />
                  )}
               </div>
            )}
         </section>
      </div>
   )
}

export default EmpDashboard