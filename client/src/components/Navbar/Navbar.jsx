import './_navbar.scss'
// import './scss/_navbar_blue.scss'
import { Badge } from '@mui/material'
import { PersonOutlineOutlined, Search } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Register from '../../pages/Register/Register'
import ShoppingBagModal from '../ShoppingBagModal/ShoppingBagModal'
import { logout } from '../../redux/userRedux'
import useClickOutside from '../../hooks/useClickOutside'

const Navbar = (props) => {
  const [modal, setModal] = useState(false)
  const [bagModal, setBagModal] = useState(false)

  const quantity = useSelector((state) => state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser)

  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const openModal = () => {
    setModal((prev) => !prev)
  }

  const openBagModal = () => {
    setBagModal((prev) => !prev)
  }

  const styles = {
    badgeStyle: {
      '& .MuiBadge-badge': {
        right: 5,
        top: 21,
        // border: `2px solid black`,
        border: `2px solid ${props.navColor ? props.navColor : 'black'}`,
        // background: `black`,
        background: `${props.navColor ? props.navColor : 'black'}`,
        // color: `white`,
        color: `${props.navNumberColor ? props.navNumberColor : 'white'}`,
        padding: '0 4px',
        fontSize: 10,
        fontWeight: 600,
        height: 16,
        minWidth: 16,
      },
    },
  }

  const closeModalOutside = useClickOutside(() => {
    setModal(false)
  })

  const closeBagModalOutside = useClickOutside(() => {
    setBagModal(false)
  })

  return (
    <div className='navbar__container'>
      <div className='navbar__main-wrapper'>
        <div className='navbar__submain-wrapper'>
          <div className='navbar__wrapper'>
            <div className='navbar__left'>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
                <h1 className='navbar__logo' style={{ color: props.navColor }}>
                  Logo
                </h1>
              </Link>
            </div>
            <div className='navbar__right'>
              {user && (
                <button
                  style={{
                    border: 'none',
                    background: 'white',
                    fontWeight: 500,
                    padding: 5,
                    borderRadius: 5,
                  }}
                  onClick={(e) => handleLogout(e)}
                >
                  LOGOUT
                </button>
              )}
              <div
                className='navbar__menu-item'
                style={{ color: props.navColor }}
              >
                <Search style={{ fontSize: 26, marginBottom: -4 }} />
              </div>
              {/* <Link to={`/register/`}> */}
              <div
                className='navbar__menu-item'
                style={{ color: props.navColor }}
                onClick={openModal}
              >
                <PersonOutlineOutlined
                  style={{ fontSize: 28, marginBottom: -3 }}
                />
              </div>
              {/* </Link> */}
              <div
                className='navbar__menu-item'
                style={{ color: props.navColor }}
                onClick={openBagModal}
              >
                <Badge sx={styles.badgeStyle} badgeContent={quantity}>
                  <i
                    className='material-icons-outlined'
                    style={{ marginBottom: 2 }}
                  >
                    shopping_bag
                  </i>
                </Badge>
                {bagModal ? (
                  <div className='navbar__triangle-wrapper'>
                    <div className='navbar__shopping-bag-helper'></div>
                    <div className='navbar__triangle' />
                    <div className='navbar__triangle-inner' />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {bagModal ? (
          <>
            <div
              className='navbar__shopping-bag-container'
              ref={closeBagModalOutside}
            >
              <ShoppingBagModal setModal={setModal} />
            </div>
          </>
        ) : null}
      </div>
      {modal ? (
        <div className='navbar__register-container'>
          <div className='navbar__register-wrapper' ref={closeModalOutside}>
            <Register setModal={setModal} />
            {user && setModal(false)}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
