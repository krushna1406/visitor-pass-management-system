import React from 'react'
import {format} from 'date-fns'

const Visitor = ({visitor, index}) => {
  return (
    <div className='grid grid-cols-[0.2fr_1fr_1fr_0.6fr_0.5fr_0.5fr] m-2 px-2 py-4 bg-white rounded-md shadow-sm text-gray-600'>
      <p>{index+1}</p>
      <p>{visitor.name}</p>
      <p>{visitor.email}</p>
      <p>{visitor.phone}</p>
      <p>{format(new Date(visitor.visitDate), 'dd MMM yyyy')}</p>
      <p className='bg-indigo-600 text-white text-center w-22 px-2 rounded-xl'>{visitor.status}</p>
    </div>
  )
}

export default Visitor