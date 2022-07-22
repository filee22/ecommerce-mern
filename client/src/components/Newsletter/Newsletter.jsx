import './_newsletter.scss'
import React from 'react'

const Newsletter = () => {
  return (
    <div className='newsletter__container'>
      <h1 className='newsletter__title'>Don't miss a thing!</h1>
      <div className='newsletter__description'>
        Sign up for the newsletter and receive exclusive offers
      </div>
      <input className='newsletter__input' placeholder='Your email address' />
      <button className='newsletter__button'>Sign up</button>
      <div className='newsletter__terms'>
        I would like to receive email updates on current trends, offers and
        vouchers.
      </div>
      <div className='newsletter__terms'>
        Unsubscribe any time, free of charge.
      </div>
    </div>
  )
}

export default Newsletter
