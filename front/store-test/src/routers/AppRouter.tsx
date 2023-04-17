import React, { useEffect } from 'react'
import { Redirect, Switch, BrowserRouter } from 'react-router-dom'

import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard/Dashboard'
import Cart from '../pages/Cart'

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem('token') ? true : false

  useEffect(() => {
    console.log({ isAuthenticated })
  }, [isAuthenticated])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <BrowserRouter>
        <Switch>
          <PublicRoutes isAuthenticated={isAuthenticated} path="/login" exact component={() => <Login />} />
          <PublicRoutes isAuthenticated={isAuthenticated} path="/register" exact component={() => <Register />} />
          <PrivateRoutes isAuthenticated={isAuthenticated} path="/dashboard" exact component={() => <Dashboard />} />
          <PrivateRoutes isAuthenticated={isAuthenticated} path="/cart" exact component={() => <Cart />} />

          <Redirect to={'/login'} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
