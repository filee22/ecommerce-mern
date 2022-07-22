import './_product.scss'
import React from 'react'
import { Favorite } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const Product = ({ item }) => {
  return (
    <div className='product__container'>
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/product/${item._id}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className='product__wrapper'>
          <div className='product__icon-container'>
            <div className='product__icon'>
              <Favorite style={{ color: 'rgb(230, 230, 230)' }} />
            </div>
          </div>
          <img className='product__image' src={item.thumbnail} />
        </div>
        <div className='product__details-container'>
          <div className='product__brand'>{item.brand}</div>
          <div className='product__info-container'>
            <div className='product__info'>{item.details}</div>
            <div className='product__info'>{item.color}</div>
          </div>
          <div className='product__price'>${item.price}</div>
        </div>
      </Link>
    </div>
  )
}

export default Product
