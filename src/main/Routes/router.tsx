import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeLogin, makeSignup, makeSurveyList } from '@/main/pages'
import { ApiContext } from '@/presentation/contexts'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { SurveyResult } from '@/presentation/pages'

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
          <Route path="/" element={<PrivateRoute>{makeSurveyList()}</PrivateRoute>} />
          <Route path="surveys" Component={SurveyResult} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
