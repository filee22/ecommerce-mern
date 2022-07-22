import './_product.scss'
import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Newsletter from '../../components/Newsletter/Newsletter'
import { FavoriteBorderOutlined } from '@material-ui/icons'
import { useLocation } from 'react-router-dom'
import { addProduct } from '../../redux/cartRedux'
import { useDispatch } from 'react-redux'
import { publicRequest } from '../../requestMethod'
import Picture from '../../components/Picture/Picture'
import PropagateLoader from 'react-spinners/PropagateLoader'

const Product = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  // GET PRODUCT
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadDelay, setLoadDelay] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const res = await publicRequest.get('/products/find/' + id)
        console.log(res.data)
        setProduct(res.data)
      } catch (err) {
        console.log(err)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      setTimeout(() => {
        setLoadDelay(false)
      }, 800)
    }
    getProduct()
  }, [id])

  // PRELOAD 360 VIEW
  const [preload, setPreload] = useState([])

  useEffect(() => {
    for (let i = 1; i <= product.imgNumber; i++) {
      setPreload((prevState) => [
        ...prevState,
        i < 10
          ? `https://ecommerce--app--mern.herokuapp.com/images/${id}/img0${i}.jpg`
          : `https://ecommerce--app--mern.herokuapp.com/images/${id}/img${i}.jpg`,
      ])
    }
  }, [id, product.imgNumber])

  // SET SIZE
  const [size, setSize] = useState('')

  // ADD TO CART
  const handleClick = () => {
    size == ''
      ? window.alert('please choose a size')
      : dispatch(addProduct({ ...product, size }))
  }

  // ESTIMATED DELIVERY DATE RANGE
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dateMin = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)

  const dateMinFormatted = `${dateMin.getDate()} ${months[dateMin.getMonth()]}`

  const dateMax = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const dateMaxFormatted = `${dateMax.getDate()} ${months[dateMax.getMonth()]}`

  return (
    <div>
      <div className='product___nav-container'>
        <Navbar />
      </div>

      {loading && (
        <div className='product___loading-animation'>
          <div className='product___loading-animation-wrapper'>
            <PropagateLoader loading={loading} color={'darkgrey'} />
          </div>
        </div>
      )}

      <div className='product___product-container'>
        {/* {!loadDelay && ( */}
        <div className='product___product-wrapper'>
          <Picture
            id={id}
            color={product.highlight}
            imgNumber={product.imgNumber}
            preload={preload}
          />
          <div className='product___info-container'>
            <div className='product___info-wrapper'>
              <div className='product___name'>{product.name}</div>
              <div className='product___color'>{product.color}</div>
              <div className='product___price'>${product.price}</div>
            </div>
            <div onChange={(e) => setSize(e.target.value)}>
              <select className='product___select' defaultValue={'default'}>
                <option className='product___option' value='default' disabled>
                  Select size
                </option>
                {!loadDelay &&
                  product.size.map((n) => (
                    <option className='product___option' key={n}>
                      {n} UK
                    </option>
                  ))}
              </select>
            </div>
            <div className='product___button-container'>
              <div className='product___cart' onClick={handleClick}>
                Add to Cart
              </div>
              <div className='product___wishlist'>
                Wishlist{' '}
                <FavoriteBorderOutlined style={{ width: 20, paddingLeft: 5 }} />
              </div>
            </div>
            <span className='product___the-details'>Estimated delivery</span>
            <div className='product___desc'>
              {dateMinFormatted} - {dateMaxFormatted}
            </div>
            {/* <span className='product___the-details'>The Details</span>
            <div className='product___desc'>{product.desc}</div> */}
          </div>
        </div>
        {/* )} */}
      </div>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Product
