import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeLogin } from '@/main/pages/login/login-factory'
import { makeSignup } from '@/main/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={makeLogin} />
        <Route path="/signup" Component={makeSignup} />
        <Route path="/" Component={SurveyList} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
