import React from 'react'

const Temperature = ({ temp, type, date }) => {
  return (
    <div>
      {temp} - {type} - {date}
    </div>
  )
}

export default Temperature