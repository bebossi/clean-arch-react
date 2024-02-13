import { faker } from '@faker-js/faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /login/

export const mockInvalidCredentialsError = (): void => {
  Http.mockUnauthorizedError(path)
}

export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'POST')
}

export const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', 'fx:account')
}

const populateFields = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(
    faker.string.alphanumeric({ length: { min: 5, max: 12 } })
  )
}
const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Required field')
    FormHelper.testInputStatus('password', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.internet.color())
    FormHelper.testInputStatus('email', 'Invalid field')
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 1, max: 3 } })
    )
    FormHelper.testInputStatus('password', 'Invalid field')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Invalid Credentials')
    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong, try again later')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    Helper.testLocalStorageItem('account')
    Helper.testUrl('/')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    Helper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is Invalid', () => {
    mockSuccess()
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    Helper.testHttpCallsCount(0)
  })
})
