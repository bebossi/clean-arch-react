import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = ({ makeLogin, makeSignup }: Factory) => {
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
