import './_products.scss'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import axios from 'axios'
import { publicRequest } from '../../requestMethod'

const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [featuredProducts, setfeaturedProducts] = useState([])

  // FETCH DATA BY CATEGORY
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce--app--mern.herokuapp.com/api/products?category=${cat}`
            : 'https://ecommerce--app--mern.herokuapp.com/api/products'
        )
        setProducts(res.data)
        setfeaturedProducts(res.data.sort((a, b) => b.price - a.price))
      } catch (err) {}
    }
    getProducts()
  }, [cat])

  // FILTER PRODUCT MODELS
  useEffect(() => {
    cat &&
      setFilteredProducts(
        filter.length > 0
          ? products.filter((item) => filter.includes(item.model))
          : products
      )
  }, [products, filter])

  // SORT BY NEWEST, ASCENDING, DESCENDING
  useEffect(() => {
    sort === 'newest'
      ? setFilteredProducts((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        )
      : sort === 'asc'
      ? setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        )
      : setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        )
  }, [sort])

  return (
    <div className='products__container'>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : featuredProducts
            .slice(0, 6)
            .map((item) => <Product item={item} key={item._id} />)}
    </div>
  )
}

export default Products
