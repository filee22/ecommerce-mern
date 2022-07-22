import './_shoppingBagModal.scss'
import React, { useEffect, useState } from 'react'
import {
  FavoriteBorderOutlined,
  LocalShippingOutlined,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useHistory } from 'react-router-dom'
import { userRequest } from '../../requestMethod'
import Register from '../../pages/Register/Register'

const KEY = process.env.REACT_APP_STRIPE

const ShoppingBagModal = (props) => {
  const user = useSelector((state) => state.user.currentUser)
  const cart = useSelector((state) => state.cart)
  const quantity = useSelector((state) => state.cart.quantity)

  const history = useHistory()

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

  // if not logged in request login upon trying to go to checkout
  const handleClick = () => {
    props.setModal(true)
  }

  console.log(quantity)
  console.log(cart)

  return (
    <div className='shoppingbagmodal__container'>
      {props.modal ? (
        <div className='cart__register-container'>
          <Register />
          {user && props.setModal(false)}
        </div>
      ) : null}
      <div className='shoppingbagmodal__wrapper'>
        {quantity < 1 ? (
          <div className='shoppingbagmodal__items-in-bag'>
            Your Bag is Empty.
          </div>
        ) : (
          <div className='shoppingbagmodal__product-in-bag-container'>
            {quantity > 3
              ? cart.products.slice(0, 3).map((product) => (
                  <div
                    className='shoppingbagmodal__product-in-bag'
                    key={cart.products.indexOf(product)}
                  >
                    <div className='shoppingbagmodal__image-wrapper'>
                      <img
                        className='shoppingbagmodal__image'
                        src={product.img}
                      />
                    </div>
                    <div className='shoppingbagmodal__item-info'>
                      <div className='shoppingbagmodal__title'>
                        {product.title}
                      </div>
                    </div>
                  </div>
                ))
              : cart.products.map((product) => (
                  <div
                    className='shoppingbagmodal__product-in-bag'
                    key={cart.products.indexOf(product)}
                  >
                    <div className='shoppingbagmodal__image-wrapper'>
                      <img
                        className='shoppingbagmodal__image'
                        src={product.img}
                      />
                    </div>
                    <div className='shoppingbagmodal__item-info'>
                      <div className='shoppingbagmodal__title'>
                        {product.title}
                      </div>
                    </div>
                  </div>
                ))}
            {quantity > 3 ? (
              <div className='shoppingbagmodal__rest-items-num-wrapper'>
                <span className='shoppingbagmodal__border'></span>
                <div className='shoppingbagmodal__rest-items-num'>
                  {quantity - 3} more {quantity - 3 > 1 ? 'items' : 'item'} in
                  your Bag
                </div>
              </div>
            ) : null}
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
                <div className='shoppingbagmodal__checkout-button-container'>
                  <button className='shoppingbagmodal__checkout-button'>
                    Check Out
                  </button>
                </div>
              </StripeCheckout>
            ) : (
              <div className='shoppingbagmodal__checkout-button-container'>
                <button
                  className='shoppingbagmodal__checkout-button'
                  onClick={handleClick}
                >
                  Check Out
                </button>
              </div>
            )}
          </div>
        )}
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <div
            className='shoppingbagmodal__category'
            style={{ borderTop: quantity > 0 && 'none' }}
            quantity={quantity}
          >
            <div className='shoppingbagmodal__icon-wrapper'>
              <i
                className='material-icons-outlined'
                style={{ fontSize: 20, marginLeft: -1 }}
              >
                shopping_bag
              </i>
            </div>
            {quantity > 0 ? (
              <div className='shoppingbagmodal__quantity'>Bag ({quantity})</div>
            ) : (
              'Bag'
            )}
          </div>
        </Link>
        <div className='shoppingbagmodal__category'>
          <div className='shoppingbagmodal__icon-wrapper'>
            <FavoriteBorderOutlined style={{ fontSize: 20 }} />
          </div>
          Wishlist
        </div>
        <div className='shoppingbagmodal__category'>
          <div className='shoppingbagmodal__icon-wrapper'>
            <LocalShippingOutlined style={{ fontSize: 20, marginLeft: 1 }} />
          </div>
          Orders
        </div>
      </div>
    </div>
  )
}

export default ShoppingBagModal
