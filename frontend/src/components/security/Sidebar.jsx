import React from 'react'

const Sidebar = ({setActiveTab}) => {
   return (
      <div className='flex flex-col gap-4 px-10 py-8 text-gray-700 text-lg'>
         <h2 className='text-gray-700 border-b-4 border-purple-500 font-bold text-xl'>Menu</h2>
         <button
            onClick={() => setActiveTab('dashboard')}
            className='rounded-lg py-1 hover:bg-purple-100 hover:text-purple-600 transition-all duration-100 focus:bg-purple-500 focus:text-white'
         >
            Dashboard
         </button>
         <button
            onClick={() => setActiveTab('approved-visitor')}
            className='rounded-lg py-1 hover:bg-purple-100 hover:text-purple-600 transition-all duration-100 focus:bg-purple-500 focus:text-white'
         >
            Approved Visitors
         </button>
         {/* <button
            onClick={() => setActiveTab('my-visitors')}
            className='rounded-lg py-1 hover:bg-purple-100 hover:text-purple-600 transition-all duration-100 focus:bg-purple-500 focus:text-white'
         >
            My Visitors
         </button> */}
      </div>
   )
}

export default Sidebar