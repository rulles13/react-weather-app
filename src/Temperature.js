import React from 'react'

const Temperature = ({ temp, type, date }) => {
  return (
    <div className='card'>
      <div className='card_temp'>{temp}</div>
      <div className='card_type'>{type}</div>
      <div className='card_date'>{date}</div>
    </div>
  )
}

export default Temperature