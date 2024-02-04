import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeLogin } from '@/main/pages/login/login-factory'
import { makeSignup } from '@/main/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={makeLogin} />
          <Route path="/signup" Component={makeSignup} />
          <Route path="/" element={<PrivateRoute>{<SurveyList />}</PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
