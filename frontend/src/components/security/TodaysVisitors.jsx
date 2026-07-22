import React from 'react'
import { format } from 'date-fns'

const TodaysVisitors = ({ visitor, index }) => {
   return (
      <div className="grid grid-cols-[60px_1.2fr_1.8fr_1.5fr_1fr_1fr] items-center gap-4 bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-100 mb-3">

         <p className="text-gray-500 font-medium">
            {index + 1}
         </p>

         <p className="font-semibold text-gray-800">
            {visitor.visitor?.name}
         </p>

         <p className="text-gray-600">
            {visitor.visitor?.email}
         </p>

         <p className="text-gray-600">
            {visitor.visitor?.purpose}
         </p>

         <p className="text-sm text-green-600 font-medium">
            {format(new Date(visitor.checkIn), 'hh:mm a')}
         </p>

         {visitor.checkOut ? (
            <p className="text-sm text-red-500 font-medium">
               {format(new Date(visitor.checkOut), 'hh:mm a')}
            </p>
         ) : ('-')
         }

      </div>
   )
}

export default TodaysVisitors