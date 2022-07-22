import './_register.scss'
import React, { useState } from 'react'
import { Close } from '@material-ui/icons'
import Checkbox from '../../components/Checkbox/Checkbox'
import Login from '../Login/Login'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

const Register = (props) => {
  useLockBodyScroll()

  const [optionButton, setoptionButton] = useState('signin')

  const handleClose = () => {
    props.setModal(false)
  }

  return (
    <div className='register___container'>
      <div className='register___wrapper'>
        <div className='register___close-button-wrapper' onClick={handleClose}>
          <Close />
        </div>
        <h1 className='register___title'>Welcome</h1>
        <div className='register___option-container'>
          <button
            className='register___signin-button'
            style={{
              color: optionButton == 'signin' ? 'black' : '#828282',
              borderBottom:
                optionButton == 'signin' ? 'solid 2px black' : 'none',
            }}
            onClick={() => setoptionButton('signin')}
            toggle={optionButton}
          >
            SIGN IN
          </button>
          <button
            className='register___register-button'
            style={{
              color: optionButton == 'register' ? 'black' : '#828282',
              borderBottom:
                optionButton == 'register' ? 'solid 2px black' : 'none',
            }}
            onClick={() => setoptionButton('register')}
            toggle={optionButton}
          >
            REGISTER
          </button>
        </div>
        {optionButton === 'signin' ? (
          <Login />
        ) : (
          <form
            className='register___form'
            // onSubmit={handleSubmit(onSubmit)}
            // method='POST'
          >
            <label className='register___label' for='name'>
              Name
            </label>
            <input className='register___input' name='name' id='name' />
            <label className='register___label' for='email'>
              Email address
            </label>
            <input className='register___input' name='email' id='email' />
            <label className='register___label' for='password'>
              Password
            </label>
            <input
              className='register___input'
              name='password'
              id='password'
              type='password'
            />
            <span className='register___agreement'>
              By registering, you agree with our <u>Terms & Conditions</u> and{' '}
              <u>Privacy and Cookie Policy</u>.
            </span>
            <div className='register___sub-wrapper'>
              <Checkbox />
              <div className='register___subscription'>
                Sign up for early sale access plus tailored new arrivals, trends
                and promotions. <u>Find out more</u>. To opt out, click
                unsubscribe in our emails.
              </div>
            </div>
            <button className='register___button'>Register</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Register
