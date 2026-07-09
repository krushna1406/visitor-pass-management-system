import React from 'react'
import {format} from 'date-fns'

const MyPasses = ({pass}) => {

   return (
      <div className='w-75 flex gap-2 m-2 pr-6 py-2 bg-white rounded-lg shadow-xs shadow-gray-300'>
         {pass.passGenerated &&
            <img 
               src={pass.qrCode} 
               alt='qrCode'
               className='w-30 h-30 p-2'
            />
         }
         <div className='text-start text-sm my-auto text-gray-600 space-y-1'>
            <h2><b>Name: </b>{pass.name}</h2>
            <p><b>Date: </b>{format(new Date(pass.visitDate), 'dd MMM yyyy')}</p>
            <p><b>Host: </b> {pass.employee.name}</p>
            {/* <p className='text-green-400'>Approved</p> */}
         </div>
      </div>
   )
}

export default MyPasses