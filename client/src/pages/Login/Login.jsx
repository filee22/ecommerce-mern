import './_login.scss'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '../../components/Checkbox/Checkbox'
import { login } from '../../redux/apiCalls'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.user)

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { email, password })
  }

  return (
    <form className='login___form'>
      <label className='login___label' for='email'>
        Email address
      </label>
      <input
        className='login___input'
        name='email'
        id='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className='login___label' for='password'>
        Password
      </label>
      <input
        className='login___input'
        name='password'
        id='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <span className='login___error'>Incorrect email or password</span>
      )}
      <div className='login___keep-signed-in-wrapper'>
        <Checkbox />
        <div className='login___keep-signed-in'>Keep me signed in.</div>
      </div>
      <div className='login___forgot-password'>
        <u>Forgot your passoword?</u>
      </div>
      <button
        className='login___button'
        onClick={handleClick}
        disabled={isFetching == true}
      >
        Sign In
      </button>
    </form>
  )
}

export default Login
