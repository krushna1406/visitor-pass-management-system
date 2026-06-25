import React, { useEffect, useState } from 'react'
import Visitor from './Visitor'
import { getAllVisitor } from '../../services/api';

const VisitorList = () => {

  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const getVisitors = async () => {
      const result = await getAllVisitor()
      if(result.success) {
        setVisitors(result.visitors)
      }
    }
    getVisitors()
  }, [])

  // console.log('In VisitorList: ', visitors)

  return (
    <div className=''>
      <div className='grid grid-cols-[0.3fr_1.3fr_1.7fr_1fr_1fr_1fr] gap-2 px-5 py-3 bg-purple-500 text-white'>
        <p>Sr.no</p>
        <p className=''>Name</p>
        <p>Email</p>
        <p>Check-in</p>
        <p>Check-out</p>
        <p>Status</p>
      </div>
      {visitors.map((visitor, index) =>
        
        <Visitor
          key={visitor._id} visitor={visitor} index={index}
        />
      )}
    </div>
  )
}

export default VisitorList