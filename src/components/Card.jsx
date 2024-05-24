


import React from 'react'

import  '../sass/Card.scss'


// recibiendo los props de forma personalizada
const Card = ({ name , img}) => {
  return (
    <div className='card'>
      {/* nombre */}
        <p className='card__name'>{name}</p>   
        <div className='card__circle'></div>
        {/* imagen */}
        <img className='card__img' src={img} alt="pokemonid" />

    </div>
  )
}

export {Card } 