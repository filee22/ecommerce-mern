import './_itemInBag.scss'
import React from 'react'
import { Close } from '@material-ui/icons'
import { popularProducts } from '../../data'

const Order = () => {
  return (
    <div className='item-in-bag__container'>
      <div className='item-in-bag__image-wrapper'>
        <div className='item-in-bag__image' src={popularProducts[1].img} />
      </div>
      <div className='item-in-bag__item-info'>
        <div className='item-in-bag__name'>{popularProducts[1].name}</div>
        <div className='item-in-bag__color'>{popularProducts[1].color}</div>
        <div className='item-in-bag__id'>ID: 17676720</div>
      </div>
      <div className='item-in-bag__size-and-quantity'>
        <div className='item-in-bag__size'>
          Size: <div className='item-in-bag__choice'> 10 UK</div>
        </div>
        <div className='item-in-bag__quantity'>
          Quantity: <div className='item-in-bag__choice'> 1</div>
        </div>
      </div>
      <div className='item-in-bag__price'>{popularProducts[1].price}</div>
      <div className='item-in-bag__closebutton-wrapper'>
        <Close style={{ width: 20 }} />
      </div>
    </div>
  )
}

export default Order
