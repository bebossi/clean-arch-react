import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { MemoryHistory, createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory
}
const makeSut = (): SutTypes => {
  const getCurrentAccount = (): AccountModel => ({
    accessToken: '',
    name: 'ugjkgiu',
  })
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{ getCurrentAccount }}>
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
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/login')
  })
})
