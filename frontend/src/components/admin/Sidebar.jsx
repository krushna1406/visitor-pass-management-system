import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
   return (
      <div className='flex flex-col gap-4 px-10 py-8 text-gray-700 text-lg'>

         <h2 className='text-gray-700 border-b-4 border-blue-500 font-bold text-xl'>Menu</h2>

         <NavLink to='/admin/dashboard'
            className={({isActive}) => `rounded-lg text-center py-1 transition-all duration-100
               ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 hover:text-blue-600'
               }
            `}
         >
            Dashboard
         </NavLink>

         <NavLink to='/admin/create-user'
            className={({isActive}) => `rounded-lg text-center py-1 transition-all duration-100
               ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 hover:text-blue-600'
               }
            `}
         >
            Create User
         </NavLink>

         <NavLink to='/admin/employees'
            className={({isActive}) => `rounded-lg text-center py-1 transition-all duration-100
               ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 hover:text-blue-600'
               }
            `}
         >
            All Employees
         </NavLink>

         <NavLink to='/admin/visitors'
            className={({isActive}) => `rounded-lg text-center py-1 transition-all duration-100
               ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 hover:text-blue-600'
               }
            `}
         >
            All Visitors
         </NavLink>

         <NavLink to='/admin/users'
            className={({isActive}) => `rounded-lg text-center py-1 transition-all duration-100
               ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 hover:text-blue-600'
               }
            `}
         >
            All Users
         </NavLink>
      </div>
   )
}

export default Sidebar