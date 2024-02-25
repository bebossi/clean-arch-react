/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET')
}

export const mockAccessdeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET')
}

export const mockSuccess = (): void => {
  Http.mockOk(path, 'GET', 'fx:survey-result')
}

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })
  it('Should present error on UnexpectedError', () => {
    cy.visit('/surveys/any_id')
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong, try again later'
    )
  })

  it('Should reload on button click', () => {
    cy.visit('/surveys/any_id')
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong, try again later'
    )
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessdeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
