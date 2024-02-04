import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { RouteProps, Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const context = useContext(ApiContext)

  if (context) {
    const token = context.getCurrentAccount()?.accessToken
    return token ? children : <Navigate to="/login" replace />
  }
}

export default PrivateRoute
