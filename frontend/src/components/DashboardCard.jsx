import React from 'react'

const DashboardCard = ({name, value}) => {

   return (
    <div className='bg-white py-3 px-4 rounded-sm shadow-sm'>
      <h2 className='text-purple-600 font-medium mb-2 text-xl'>{name}</h2>
      <p className='text-gray-600 text-2xl transition-normal'>{value ?? 0}</p>
    </div>
  )
}

export default DashboardCard