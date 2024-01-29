import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'

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
})
