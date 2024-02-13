import { faker } from '@faker-js/faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /signup/
export const mockEmailInUseError = (): void => {
  Http.mockForbiddenError(path, 'POST')
}

export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'POST')
}

export const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', 'fx:account')
}

const populateFields = (): void => {
  cy.getByTestId('name').type(faker.person.fullName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.string.alphanumeric({ length: { min: 5, max: 12 } })
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}
describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Required field')
    FormHelper.testInputStatus('email', 'Required field')
    FormHelper.testInputStatus('password', 'Required field')
    FormHelper.testInputStatus('passwordConfirmation', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.string.alphanumeric({ length: { min: 1, max: 3 } }))
    FormHelper.testInputStatus('name', 'Invalid field')

    cy.getByTestId('email').type(faker.internet.color())
    FormHelper.testInputStatus('email', 'Invalid field')

    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 1, max: 3 } })
    )
    FormHelper.testInputStatus('password', 'Invalid field')

    cy.getByTestId('passwordConfirmation').type(
      faker.string.alphanumeric({ length: { min: 1, max: 3 } })
    )
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.person.fullName())
    FormHelper.testInputStatus('name')
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('This e-mail is already in use')
    Helper.testUrl('/signup')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong, try again later')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
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
