import React from 'react'
import {format} from 'date-fns'

const Visitor = ({visitor, index}) => {
  return (
    <div className='grid grid-cols-[0.2fr_0.6fr_1.2fr_0.4fr_0.5fr_0.5fr] gap-3 m-2 px-2 py-4 bg-white rounded-md shadow-sm text-gray-600 wrap-break-word'>
      {visitor.photo ? (
        <img src={visitor.photo} className='w-10 h-10 rounded-full -translate-y-1 border-2 border-blue-600'/>
      ) : (
        <img
          src="/profile-placeholder.jpg" className='w-10 h-10 rounded-full -translate-y-1 border-2 border-blue-600' 
        />
      )}
      <p>{visitor.name}</p>
      <p className='overflow-hidden'>{visitor.email}</p>
      <p>{visitor.phone}</p>
      <p>{format(new Date(visitor.visitDate), 'dd MMM yyyy')}</p>
      <p className='bg-blue-600 text-white text-center w-22 h-8 px-2 pt-1 rounded-2xl'>
        {visitor.status}
      </p>
    </div>
  )
}

export default Visitor