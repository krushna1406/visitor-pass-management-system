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
    <div className=''>
      <div className='grid grid-cols-[0.3fr_1.3fr_1.7fr_1fr_1fr_1fr] gap-2 px-5 py-3 bg-purple-500 text-white'>
        <p>Sr.no</p>
        <p className=''>Name</p>
        <p>Email</p>
        <p>Check-in</p>
        <p>Check-out</p>
        <p>Status</p>
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