import './_categories.scss'
import React from 'react'
import { categories } from '../../data'
import CategoryItem from '../CategoryItem/CategoryItem'

const Categories = () => {
  return (
    <div className='categories__container'>
      <div className='categories__wrapper'>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Categories
