import { faker } from '@faker-js/faker'
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required field')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required field')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.internet.color())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('contain.text', '🔴')
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 1, max: 3 } })
    )
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'OK')
      .should('contain.text', '🟢')
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'OK')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('exist')
  })
})
