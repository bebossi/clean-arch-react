import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(
    faker.string.alphanumeric({ length: { min: 5, max: 12 } })
  )
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
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Invalid Credentials')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong, try again later')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong, try again later')
    FormHelper.testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOk()
    simulateValidSubmit()
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is Invalid', () => {
    Http.mockOk()
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0)
  })
})
