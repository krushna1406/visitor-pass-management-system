import React from 'react'
import {format} from 'date-fns'

const Visitor = ({visitor, index}) => {
  return (
    <div className='grid grid-cols-[0.2fr_1.3fr_1.3fr_0.8fr_0.7fr] m-2 p-2 bg-white rounded-md shadow-sm text-gray-600'>
      <p>{index+1}</p>
      <p>{visitor.name}</p>
      <p>{visitor.email}</p>
      <p>{visitor.phone}</p>
      <p className='bg-purple-600 text-white w-22 px-2 rounded-xl'>{visitor.status}</p>
    </div>
  )
}

export default Visitor