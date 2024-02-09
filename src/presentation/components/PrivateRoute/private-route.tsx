/* eslint-disable multiline-ternary */
import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { getCurrentAccount } = useContext(ApiContext)
  const token = getCurrentAccount()?.accessToken

  // eslint-disable-next-line multiline-ternary
  return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
