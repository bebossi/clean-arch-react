import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { MemoryHistory, createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}
const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute></PrivateRoute>
      </Router>
    </ApiContext.Provider>
  )

  return {
    history,
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if accessToken is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render current component if token is valid', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
