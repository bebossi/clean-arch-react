import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { RouteProps, Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const context = useContext(ApiContext)

  // eslint-disable-next-line multiline-ternary
  return context?.getCurrentAccount()?.accessToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoute
