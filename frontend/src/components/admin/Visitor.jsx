import React from 'react'
import {format} from 'date-fns'

const Visitor = ({visitor, index}) => {
  // console.log(visitor)
  return (
    <div className='grid grid-cols-[0.3fr_1.3fr_1.7fr_1fr_1fr_1fr] gap-2 mx-2 bg-white my-2 py-2 px-4 rounded-md text-gray-600 shadow-sm shadow-gray-200'>
      <p>{index+1}</p>
      <p>{visitor.name}</p>
      <p>{visitor.email}</p>
      {!visitor.checkIn && 
        <p>-</p>
      }
      {visitor.checkIn &&
        <p>{format(new Date(visitor.checkIn), 'dd MMM, hh:mm a')}</p>
      }
      {!visitor.checkOut &&
        <p>-</p>
      }
      {visitor.checkOut &&
        <p>{visitor.checkOut}</p>
      }
      <p
        className={`
          ${ visitor.status === 'pending'
          ? 'text-yellow-400' : 'text-green-400'}
          ${ visitor.status === 'rejected'
          ? 'text-red-500' : 'text-green-400'
          }
        `}
      >{visitor.status}</p>
    </div>
  )
}

export default Visitor