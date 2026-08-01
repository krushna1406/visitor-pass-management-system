import React from 'react'

const DashboardCard = ({name, value}) => {

   return (
    <div className='bg-white py-3 px-4 rounded-md shadow-sm min-w-0'>
      <h2 className='text-blue-600 font-medium mb-2 text-base md:text-lg'>{name}</h2>
      <p className='text-gray-600 text-2xl md:text-4xl transition-normal'>{value ?? 0}</p>
    </div>
  )
}

export default DashboardCard