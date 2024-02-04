import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

describe('PrivateRoute', () => {
  test('Should redirect to /login if accessToken is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const getCurrentAccount = (): AccountModel => ({
      accessToken: '',
      name: 'ugjkgiu',
    })

    render(
      <ApiContext.Provider value={{ getCurrentAccount }}>
        <Router location={history.location} navigator={history}>
          <PrivateRoute></PrivateRoute>
        </Router>
      </ApiContext.Provider>
    )
    expect(history.location.pathname).toBe('/login')
  })
})
