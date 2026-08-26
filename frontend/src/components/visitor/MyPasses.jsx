import React from 'react'
import {format} from 'date-fns'

const MyPasses = ({pass}) => {

   return (
      <div className='relative w-75 flex gap-2 m-2 pr-6 py-2 bg-white rounded-lg shadow-xs shadow-gray-300'>

         <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gray-100 border-r-2 border-gray-200"/>

         {/* Right semicircle cutout */}
         <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gray-100 border-l-2 border-gray-300"/>

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
            <p><b>Host: </b> {pass.employee?.name}</p>
         </div>
      </div>
   )
}

export default MyPasses