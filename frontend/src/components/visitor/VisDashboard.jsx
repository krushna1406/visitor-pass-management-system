import React, { useEffect, useState } from 'react'
import { getVisitorStats, getPasses } from '../../services/api';
import DashboardCard from '../DashboardCard';
import MyPasses from './MyPasses';
import { IoInformationCircleOutline } from 'react-icons/io5'

const VisDashboard = () => {
   const [stats, setStats] = useState({});

   const [passes, setPasses] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchVisitorStats = async () => {
         try {
            const result = await getVisitorStats()
            if (result.success) {
               setStats(result.stats);
            }
         } catch (error) {
            console.log(error.response?.data?.message);
         }
      }
      fetchVisitorStats();

      const fetchPasses = async () => {
         setLoading(true);
         setError(null);
         try {
            const result = await getPasses();
            if (result.success) {
               setPasses(result.passes);
            }
         } catch (error) {
            setError(error.response?.data?.message || 'Internal Server Error');
         } finally {
            setLoading(false);
         }
      }
      fetchPasses()
   }, [])

   return (
      <div className=''>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mx-4 md:mx-8 mt-6 md:mt-10'>
            <DashboardCard name={'Approved Visits'} value={stats.approved} />
            <DashboardCard name={'Pending Visits'} value={stats.pending} />
            <DashboardCard name={'Rejected Visits'} value={stats.rejected} />
            <DashboardCard name={'Total Visits'} value={stats.totalVisits} />
         </div>

         <div className='mx-4 md:mx-6 mt-6 md:mt-8'>
            <h2 className='text-xl font-semibold'>My Passes</h2>

            <div className='flex flex-wrap'>
               {loading ? (
                  <div className='text-lg ml-4 md:ml-20 mt-6 text-gray-400 font-semibold'>
                     Loading...
                  </div>
               ) : passes.length === 0 ? (
                  <div className='flex gap-2 text-lg ml-4 md:ml-20 mt-6 text-gray-400 font-semibold'>
                     <div className='flex justify-center'><IoInformationCircleOutline size={28} /></div>
                     <p>No passes yet</p>
                  </div>
               ) : error ? (
                  <div className='text-lg ml-4 md:ml-20 mt-6 text-red-500'>
                     {error}
                  </div>
               ) : (
                  passes.map((pass) => (
                     <MyPasses key={pass._id} pass={pass} />
                  ))
               )}
            </div>
         </div>
      </div>
   )
}

export default VisDashboard