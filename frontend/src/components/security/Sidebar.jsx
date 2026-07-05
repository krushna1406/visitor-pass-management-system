import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
   return (
      <div className='flex flex-col gap-4 px-10 py-8 text-gray-700 text-lg'>
         <h2 className='text-gray-700 border-b-4 border-indigo-500 font-bold text-xl'>Menu</h2>
         <NavLink to='/security/dashboard'
            className='rounded-lg py-1 hover:bg-indigo-100 text-center hover:text-indigo-600 transition-all duration-100 focus:bg-indigo-500 focus:text-white'
         >
            Dashboard
         </NavLink>

         <NavLink to='/security/check-in'
            className='rounded-lg py-1 hover:bg-indigo-100 text-center hover:text-indigo-600 transition-all duration-100 focus:bg-indigo-500 focus:text-white'
         >
            Check-In
         </NavLink>

         <NavLink to='/security/check-out'
            className='rounded-lg py-1 hover:bg-indigo-100 text-center hover:text-indigo-600 transition-all duration-100 focus:bg-indigo-500 focus:text-white'
         >
            Check-Out
         </NavLink>
      </div>
   )
}

export default Sidebar