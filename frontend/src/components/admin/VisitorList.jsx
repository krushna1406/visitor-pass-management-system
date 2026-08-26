import React, { useEffect, useState } from 'react'
import Visitor from './Visitor'
import { getAllVisitor } from '../../services/api';
import { useVisitorContext } from '../../hooks/useVisitorContext';
import { IoInformationCircleOutline } from 'react-icons/io5'

const VisitorList = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { visitors, dispatch } = useVisitorContext()

  useEffect(() => {
    const getVisitors = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await getAllVisitor()
        if (result.success) {
          dispatch({
            type: 'SET_VISITORS',
            payload: result.visitors
          })
          setLoading(false)
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Internal server error')
        setLoading(false)
      }
    }
    getVisitors()
  }, [])

  if (loading) {
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
    <div className='bg-[#f9f9f9] py-1 mx-8 shadow-sm m-3 rounded-md'>
      <div className='grid grid-cols-[0.3fr_1.1fr_1.5fr_0.8fr_0.4fr_1fr] gap-2 px-5 py-3 bg-blue-500 text-white rounded-t-md font-bold'>
        <p>Profile</p>
        <p>Name</p>
        <p>Email</p>
        <p className='text-start'>Phone</p>
        <p className='text-start'>Host</p>
        <p className='text-start ml-6'>Status</p>
      </div>
      
      <div className='max-h-[calc(100vh-150px)] overflow-y-auto'>
        {visitors.length === 0 ? (
          <div className='text-gray-400 text-center my-8'>
            <div className='flex justify-center'><IoInformationCircleOutline size={40}/></div>
            <p>No records found</p>
          </div>
        ) : (
          visitors.map((visitor, index) =>
            <Visitor
              key={visitor._id} visitor={visitor} index={index}
            />
          )
        )
        }
      </div>
    </div>
  )
}

export default VisitorList