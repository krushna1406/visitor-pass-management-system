import React from 'react'
import { updateVisitStatus } from '../../services/api'

const PendingVisitCard = ({visitor}) => {

  const handleApproveReject = async(status) => {
    try {
      const result = await updateVisitStatus(visitor._id, status);
      console.log(result);
      // window.location.reload();
    }catch(error) {
      console.log(error.response?.data?.message);
    }
  }

  return (
    <div className='m-5 bg-white w-fit px-6 py-5 rounded-lg shadow-md shadow-gray-200'>
      <h4 className='text-indigo-700 font-semibold text-lg mb-1'>{visitor.name}</h4>
      <p className='text-gray-600 text-sm ml-2 mb-1'>{visitor.email}</p>
      <p className='text-gray-600 text-sm ml-2'>{visitor.phone}</p>
      <div className='flex gap-2 mt-3'>
        <button
          onClick={() => handleApproveReject({status:'approved'})}
          className='py-1 px-3 rounded-md bg-green-500 active:bg-green-600 text-white'
        >
          Approve
        </button>
        <button
          onClick={() => handleApproveReject({status:'rejected'})}
          className='py-1 px-3 rounded-md bg-red-500 text-white'
        >
          Reject
          </button>
      </div>
    </div>
  )
}

export default PendingVisitCard