import React, { useEffect, useState } from 'react'
import { getEmployeeVisitors } from '../../services/api';
import Visitor from './Visitor';
import toast from 'react-hot-toast';

const VisitorList = () => {

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVisitors = async () => {
      setLoading(true);
      setError(null);
      try{
        const result = await getEmployeeVisitors();
        if(result.success) {
          setVisitors(result.visitors);
        }
      }catch(error) {
        setError(error.message || 'Internal server error')
      }finally{
        setLoading(false);
      }
    }
    getVisitors();
  }, [])

  if(loading) {
    return (
      <div className='text-center mt-20 text-xl text-gray-400'>Loading.....</div>
    )
  }

  if(error) {
    return (
      <div className='text-center mt-20 text-xl text-red-500'>{error}</div>
    )
  }

  return (
    <div className='m-4 bg-[#f9f9f9] pb-1 shadow-md rounded-md'>
      <div className='grid grid-cols-[0.2fr_1.3fr_1.3fr_0.8fr_0.7fr] bg-purple-500 text-white px-4 py-3 rounded-t-md'>
        <p>Sr.</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Status</p>
      </div>
      {visitors.map((visitor, index) =>
        <Visitor key={visitor._id} visitor={visitor} index={index}/>
      )}
    </div>
  )
}

export default VisitorList