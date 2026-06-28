import React from 'react'

const Visitor = ({visitor, index}) => {

  // console.log(visitor)
  return (
    <div className='grid grid-cols-[0.3fr_1.3fr_1.7fr_1fr_1fr_1fr] gap-2 mx-2 bg-white my-2 py-2 px-4 rounded-md text-gray-600 shadow-sm shadow-gray-200'>
      <p>{index+1}</p>
      <p>{visitor.name}</p>
      <p>{visitor.email}</p>
      <p className='text-center'>{visitor.phone}</p>
      <p className='text-blue-400 text-center'>{visitor.employee.empId}</p>
      <p
        className={`bg-purple-600 rounded-xl w-22 text-white ml-8 text-center`}
      >{visitor.status}</p>
    </div>
  )
}

export default Visitor