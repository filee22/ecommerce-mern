import './_cart.scss'
import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Newsletter from '../../components/Newsletter/Newsletter'
import { Close } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct } from '../../redux/cartRedux'
import { useHistory } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../../requestMethod'
import Register from '../Register/Register'
import useClickOutside from '../../hooks/useClickOutside'

const KEY = process.env.REACT_APP_STRIPE

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser)
  const cart = useSelector((state) => state.cart)
  const quantity = useSelector((state) => state.cart.quantity)
  const history = useHistory()

  const dispatch = useDispatch()

  // REMOVE ITEM FROM BAG
  const handleClick = (item) => {
    dispatch(removeProduct(item))
  }

  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal((prev) => !prev)
  }

  const closeModalOutside = useClickOutside(() => {
    setModal(false)
  })

  const [stripeToken, setStripeToken] = useState(null)
  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        })
        history.push('/success', { stripeData: res.data, products: cart })
      } catch {}
    }
    stripeToken && makeRequest()
  }, [stripeToken, cart.total, history])

  return (
    <div className='cart___container'>
      {modal ? (
        <div className='cart__register-container'>
          <div className='cart__register-wrapper' ref={closeModalOutside}>
            <Register setModal={setModal} />
            {user && setModal(false)}
          </div>
        </div>
      ) : null}
      <div className='cart___nav-wrapper'>
        <Navbar />
      </div>
      <div className='cart___cart-container'>
        <div className='cart___cart-wrapper'>
          <h1 className='cart___title'>SHOPPING BAG</h1>
          <div className='cart___bag-container'>
            {quantity < 1 ? (
              <div className='cart___empty-bag'>Your Bag is Empty.</div>
            ) : (
              <div className='cart___items-in-bag'>
                {cart.products.map((product) => (
                  <div className='cart___item' key={product._id}>
                    <div className='cart___image-wrapper'>
                      <img className='cart___image' src={product.img} />
                    </div>
                    <div className='cart___item-info'>
                      <div className='cart___item-name'>{product.name}</div>
                      <div className='cart___item-color'>{product.color}</div>
                      <div className='cart___item-id'>ID: {product._id}</div>
                    </div>
                    <div className='cart___item-size-quantity-container'>
                      <div className='cart___item-size'>
                        Size:{' '}
                        <span style={{ fontWeight: 600 }}> {product.size}</span>
                      </div>
                      <div className='cart___item-quantity'>
                        Quantity: <span style={{ fontWeight: 600 }}> 1</span>
                      </div>
                    </div>
                    <div className='cart___item-price'>${product.price}</div>
                    <div
                      className='cart___close-button-wrapper'
                      onClick={() => handleClick(product)}
                    >
                      <Close style={{ width: 20 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className='cart___summary'>
              <h2 className='cart___summary-title'>Summary</h2>
              <div className='cart___summary-info'>
                Subtotal <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className='cart___summary-info'>
                Delivery <span>{cart.total > 0 ? '$10.00' : '$0.00'}</span>
              </div>
              <div className='cart___total'>
                Total{' '}
                <div className='cart___total-value'>
                  {cart.total > 0
                    ? (
                        '$' + (Number(cart.total) + Number(10)).toFixed(2)
                      ).toString()
                    : '$0.00'}
                </div>
              </div>
              {user && cart.quantity > 0 ? (
                <StripeCheckout
                  name='section.80'
                  image='https://i.imgur.com/em1I5Rn.png'
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <button className='cart___checkout-button'>
                    Go to Checkout
                  </button>
                </StripeCheckout>
              ) : (
                <button className='cart___checkout-button' onClick={openModal}>
                  Go to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Cart
