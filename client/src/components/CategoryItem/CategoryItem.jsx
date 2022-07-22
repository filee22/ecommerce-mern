import './_categoryItem.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ item }) => {
  return (
    <div className='category-item__container'>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/products/${item.cat}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className='category-item__info'>
          <h1 className='category-item__title'>{item.title}</h1>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItem
