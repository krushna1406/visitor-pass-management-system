import React from 'react'

const Sidebar = ({setActiveTab}) => {
   return (
      <div className='flex flex-col gap-6'>
         <h2>Menu</h2>
         <button
            onClick={() => setActiveTab('dashboard')}
         >
            Dashboard
         </button>
         <button
            onClick={() => setActiveTab('create-user')}
         >
            Create User
         </button>
         <button
            onClick={() => setActiveTab('users')}
         >
            All Users
         </button>
         <button
            onClick={() => setActiveTab('visitors')}
         >
            All Visitors
         </button>
      </div>
   )
}

export default Sidebar