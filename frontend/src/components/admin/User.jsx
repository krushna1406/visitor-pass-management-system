import React from 'react'

const User = ({user}) => {
   return (
      <div className='grid grid-cols-[0.5fr_1.5fr_2fr_1fr] gap-2 mx-2 bg-white my-2 py-2 px-4 rounded-md text-gray-600 shadow-sm shadow-gray-200'>
         {user.empId ? <p>{user.empId}</p> : <p>-</p>}
         <p>{user.name}</p>
         <p>{user.email}</p>
         <p className='bg-purple-600 w-22 text-white text-center rounded-xl my-1'>{user.role}</p>
      </div>
   )
}

export default User