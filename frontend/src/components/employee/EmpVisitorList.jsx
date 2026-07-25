import React, { useEffect, useState } from 'react'
import { getEmployeeVisitors } from '../../services/api';
import Visitor from './Visitor';
import toast from 'react-hot-toast';
import { IoInformationCircleOutline } from 'react-icons/io5'

const EmpVisitorList = () => {

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
      <div className='grid grid-cols-[0.2fr_1.2fr_1.2fr_0.7fr_0.5fr_0.5fr] bg-indigo-500 text-white px-4 py-3 rounded-t-md'>
        <p>Sr.</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Date</p>
        <p>Status</p>
      </div>
      {visitors.length === 0 ? (
        <div className='text-gray-400 text-center my-8'>
          <div className='flex justify-center'><IoInformationCircleOutline size={40} /></div>
          <p>No records found</p>
        </div>
      ) : (
        visitors.map((visitor, index) =>
          <Visitor key={visitor._id} visitor={visitor} index={index}/>
        )
      )}
    </div>
  )
}

export default EmpVisitorList