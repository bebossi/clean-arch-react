import { faker } from '@faker-js/faker'
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Required field')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Required field')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Required field')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.internet.color())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Invalid field')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Invalid field')
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 1, max: 3 } })
    )
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Invalid field')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Invalid field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 401,
        body: {
          error: 'Invalid credentials',
        },
      }
    )
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
      .should('contain.text', 'Invalid Credentials')
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 400,
        body: {
          error: faker.word.words(),
        },
      }
    )
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Something went wrong, try again later')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          invalidProperty: faker.string.uuid(),
        },
      }
    )
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Something went wrong, try again later')
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.string.uuid(),
        },
      }
    )
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should prevent multiple submits', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.string.uuid(),
        },
      }
    ).as('request')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(
      faker.string.alphanumeric({ length: { min: 5, max: 12 } })
    )
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is Invalid', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          invalidProperty: faker.string.uuid(),
        },
      }
    ).as('request')
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
