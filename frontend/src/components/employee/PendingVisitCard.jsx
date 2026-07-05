import React from 'react'
import { updateVisitStatus } from '../../services/api'
import { useVisitorContext } from '../../hooks/useVisitorContext'

const PendingVisitCard = ({visitor}) => {

  const {dispatch} = useVisitorContext();

  const handleApproveReject = async(status) => {
    try {
      const result = await updateVisitStatus(visitor._id, status);

      if(result.success && status === 'approved') {
        dispatch({
          type: 'APPROVE_VISITOR', 
          payload: visitor._id
        })
      }
      if(result.success && status === 'rejected') {
        dispatch({
          type: 'REJECT_VISITOR',  
          payload: visitor._id
        })
      }
    }catch(error) {
      console.log(error.response?.data?.message);
    }
  }

  return (
    <div className='w-62 m-5 bg-white px-6 py-5 rounded-xl shadow-lg shadow-gray-200'>
      <h4 className='text-indigo-700 font-semibold text-lg mb-1'>{visitor.name}</h4>
      <p className='text-gray-600 text-sm mb-1 wrap-break-word'>{visitor.email}</p>
      <p className='text-gray-600 text-sm'>{visitor.phone}</p>
      <div className='flex gap-5 mt-3'>
        <button
          onClick={() => handleApproveReject('approved')}
          className='w-22 py-1 px-auto rounded-md bg-green-500 active:bg-green-600 text-white'
        >
          Approve
        </button>
        <button
          onClick={() => handleApproveReject('rejected')}
          className='w-22 py-1 px-auto rounded-md bg-red-500 active:bg-red-600 text-white'
        >
          Reject
          </button>
      </div>
    </div>
  )
}

export default PendingVisitCard