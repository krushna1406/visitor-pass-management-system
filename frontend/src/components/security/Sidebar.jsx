import React from 'react'

const Sidebar = ({setActiveTab}) => {
   return (
      <div className='flex flex-col gap-4 px-10 py-8 text-gray-700 text-lg'>
         <h2 className='text-gray-700 border-b-4 border-indigo-500 font-bold text-xl'>Menu</h2>
         <button
            onClick={() => setActiveTab('dashboard')}
            className='rounded-lg py-1 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-100 focus:bg-indigo-500 focus:text-white'
         >
            Dashboard
         </button>
         <button
            onClick={() => setActiveTab('check-in')}
            className='rounded-lg py-1 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-100 focus:bg-indigo-500 focus:text-white'
         >
            Check-In
         </button>
         <button
            onClick={() => setActiveTab('check-out')}
            className='rounded-lg py-1 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-100 focus:bg-indigo-500 focus:text-white'
         >
            Check-Out
         </button>
      </div>
   )
}

export default Sidebar