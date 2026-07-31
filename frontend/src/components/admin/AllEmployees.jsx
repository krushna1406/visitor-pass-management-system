import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/api'
import User from './User';
import { useUserContext } from '../../hooks/useUserContext';
import { IoInformationCircleOutline } from 'react-icons/io5'

const AllEmployees = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { users, dispatch } = useUserContext()

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getAllUsers();

        if (result.success) {
          const employees = result.users.filter(user =>
            user.role === 'employee'
          )
          dispatch({
            type: 'GET_USERS',
            payload: employees
          })
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Internal server error')
      } finally {
        setLoading(false)
      }
    }
    getUsers();
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
    <div className='bg-[#f9f9f9] py-1 shadow-sm m-3 rounded-md'>
      <div className='grid grid-cols-[0.5fr_1.5fr_2fr_1fr] gap-2 px-5 py-3 bg-blue-500 text-white rounded-t-md'>
        <p className=''>EmpId</p>
        <p className='ml-5'>Name</p>
        <p className='ml-5'>Email</p>
        <p className='ml-5'>Role</p>
      </div>
      
      {users.length === 0 ? (
        <div className='text-gray-400 text-center my-8'>
          <div className='flex justify-center'><IoInformationCircleOutline size={40} /></div>
          <p>No records found</p>
        </div>
      ) : (
        users.map((user, index) =>
          <User key={user._id} user={user} index={index} />
        )
      )}
    </div>
  )
}

export default AllEmployees