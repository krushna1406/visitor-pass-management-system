import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/api'
import User from './User';

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(false)
      setError(null)
      try {
        const result = await getAllUsers();
        if (result.success) {
          setUsers(result.users);
        }
      }catch(error) {
        setError(error.response?.data?.message || 'Internal server error')
      }finally{
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
      <div className='grid grid-cols-[0.5fr_1.5fr_2fr_1fr] gap-2 px-5 py-3 bg-purple-500 text-white rounded-t-md'>
        <p className=''>EmpId</p>
        <p className='ml-5'>Name</p>
        <p className='ml-5'>Email</p>
        <p className='ml-5'>Role</p>
      </div>
      {users.map((user, index) =>
        <User
          key={user._id} user={user} index={index}
        />
      )}
    </div>
  )
}

export default UserList