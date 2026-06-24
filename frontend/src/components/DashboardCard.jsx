import React from 'react'

const DashboardCard = ({name, value}) => {
   return (
    <div>
      <h2>{name}</h2>
      <p>{value}</p>
    </div>
  )
}

export default DashboardCard