import React from 'react'
import { deleteUser } from '../../services/api'
import { IoTrashOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'
import { useUserContext } from '../../hooks/useUserContext'

const User = ({ user }) => {

   const {dispatch} = useUserContext();

   const handleDelete = async () => {
      if(user.role === 'admin') {
         window.alert('Admin cannot be deleted');
         return;
      }
      try{
         const result = await deleteUser(user._id);
         if(result.success) {
            toast.success('User records deleted successfully')
            dispatch({
               type: 'DELETE_USER',
               payload: user._id
            })
            return;
         }
      }catch(error) {
         toast.error(error.response?.data?.message || 'Internal server error');
      }
   }

   return (
      <div className='grid grid-cols-[0.5fr_1.5fr_2fr_0.7fr_0.2fr] gap-2 mx-2 bg-white my-2 py-2 px-4 rounded-md text-gray-600 shadow-sm shadow-gray-200'>
         {user.empId ? <p>{user.empId}</p> : <p>-</p>}
         <p>{user.name}</p>
         <p>{user.email}</p>
         <p className='bg-indigo-600 w-22 text-white text-center rounded-xl my-1'>{user.role}</p>
         <p>
            <IoTrashOutline
                color='red'
               onClick={() => {
                  const confirm = window.confirm('Are you sure you want to delete this records ?')
                  if(confirm) {
                     handleDelete();
                  }
               }}
            />
         </p>
      </div>
   )
}

export default User