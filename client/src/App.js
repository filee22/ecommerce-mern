import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import ProductList from './pages/ProductList/ProductList'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Success from './pages/Success/Success'

const App = () => {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products/'>
          <ProductList />
        </Route>
        <Route path='/products/:category'>
          <ProductList />
        </Route>
        <Route path='/product/:id'>
          <Product />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/success'>
          <Success />
        </Route>
        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
