import './_productList.scss'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Newsletter from '../../components/Newsletter/Newsletter'
import Products from '../../components/Products/Products'
import CheckboxProducts from '../../components/CheckboxProducts/CheckboxProducts'

const ProductList = (props) => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]

  const [filter, setFilter] = useState([])
  const [sort, setSort] = useState()

  // FILTERS BY CATEGORY
  const productModels = {
    yeezy: ['350 V2', '450', '700', '700 V2', '700 V3', 'Slide'],
    jordan: ['1', '4', '5', '12'],
  }

  return (
    <div>
      <div className='productlist__navbar-wrapper'>
        <Navbar />
      </div>
      <div className='productlist___content-container'>
        <div className='productlist___content-wrapper'>
          <div className='productlist___title-container'>
            <h1>{cat === 'yeezy' ? 'adidas YEEZY' : 'Air Jordan'}</h1>
            <div className='productlist___sort'>
              <select
                className='productlist___select'
                defaultValue={'default'}
                onChange={(e) => setSort(e.target.value)}
              >
                <option
                  className='productlist___option'
                  value='default'
                  disabled
                >
                  Sort by
                </option>
                <option className='productlist___option' value='newest'>
                  Newest
                </option>
                <option className='productlist___option' value='asc'>
                  Price (asc)
                </option>
                <option className='productlist___option' value='desc'>
                  Price (desc)
                </option>
              </select>
            </div>
          </div>
          <div className='productlist___filter-container'>
            <div className='productlist___filter-wrapper'>
              <div className='productlist___filter'>
                {(cat === 'yeezy'
                  ? productModels.yeezy
                  : productModels.jordan
                ).map((n) => (
                  <CheckboxProducts
                    product={n}
                    key={n}
                    name='filter'
                    filter={filter}
                    setFilter={setFilter}
                  />
                ))}
              </div>
            </div>
            <div className='productlist___products-wrapper'>
              <Products cat={cat} filter={filter} sort={sort} />
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default ProductList
