import React from 'react'
import './Card.css'

const Card = ({ title, icon }) => {
  return (
    <div className="card">
      <div className="card__icon">
        <img src={icon} alt={title} />
      </div>
      <div className="card__title">{title}</div>
    </div>
  )
}

export default Card
