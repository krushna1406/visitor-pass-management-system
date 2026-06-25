import React, { useEffect, useState } from 'react'
import Visitor from './Visitor'
import { getAllVisitor } from '../../services/api';

const VisitorList = () => {

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVisitors = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await getAllVisitor()
        if (result.success) {
          setVisitors(result.visitors)
          setLoading(false)
        }
      }catch(error) {
        setError(error.response?.data?.message || 'Internal server error')
        setLoading(false)
      }
    }
    getVisitors()
  }, [])

  // console.log('In VisitorList: ', visitors)
  if(loading) {
    return (
      <div className='text-center mt-10 text-gray-400 text-xl'>Loading....</div>
    )
  }
  if (error) {
    return (
      <div className='text-center mt-10 text-xl text-red-500'>
        {error}
      </div>
    )
  }

  return (
    <div className='bg-[#f9f9f9] py-1 shadow-sm m-3 rounded-md'>
      <div className='grid grid-cols-[0.3fr_1.3fr_1.7fr_1fr_1fr_1fr] gap-2 px-5 py-3 bg-purple-500 text-white rounded-t-md'>
        <p>Sr.</p>
        <p>Name</p>
        <p>Email</p>
        <p className='text-center'>Phone</p>
        <p className='text-center'>Host</p>
        <p className='text-center'>Status</p>
      </div>
      {visitors.map((visitor, index) =>

        <Visitor
          key={visitor._id} visitor={visitor} index={index}
        />
      )}
    </div>
  )
}

export default VisitorList