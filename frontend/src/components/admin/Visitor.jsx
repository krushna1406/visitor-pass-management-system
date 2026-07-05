import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import {deleteVisitor} from '../../services/api'
import toast from 'react-hot-toast'
import {useVisitorContext} from '../../hooks/useVisitorContext'

const Visitor = ({ visitor, index }) => {

  const {dispatch} = useVisitorContext()

  const handleClick = async () => {
    try{
      const result = await deleteVisitor(visitor._id);
      if(result.success) {
        dispatch({
          type: 'DELETE_VISITOR',
          payload: visitor._id
        })
      }
      toast.success('Visitor records deleted');
    }catch(error) {
      console.log(error.response?.data?.message);
    }
  }
  return (
    <div className='grid grid-cols-[0.2fr_1.3fr_1.5fr_1.2fr_0.4fr_1fr_0.2fr] gap-2 mx-2 bg-white my-2 py-4 px-4 rounded-md text-gray-600 shadow-sm shadow-gray-200'>
      <p>{index + 1}</p>
      <p>{visitor.name}</p>
      <p>{visitor.email}</p>
      <p className='text-center'>{visitor.phone}</p>
      <p className='text-blue-400 text-center'>{visitor.employee.empId}</p>
      <p
        className={`bg-indigo-600 rounded-xl w-22 text-white ml-8 text-center`}
      >{visitor.status}</p>
      <p
        onClick={() => {
          const confirm = window.confirm('Are you sure to delete visitor record ?');
          if(confirm) {
            handleClick();
          }
        }}
      ><IoTrashOutline color='red'/></p>
    </div>
  )
}

export default Visitor