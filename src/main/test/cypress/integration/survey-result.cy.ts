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

  it('Should present SurveyResult', () => {
    mockSuccess()
    cy.visit('/surveys/anyid')
    cy.getByTestId('question').should('have.text', 'Question 1')
    cy.getByTestId('day').should('have.text', '03')
    cy.getByTestId('month').should('have.text', 'fev')
    cy.getByTestId('year').should('have.text', '2024')
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
      assert.equal(li.find('[data-testid="percent"]').text(), '70%')

      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer2')
      assert.equal(li.find('[data-testid="percent"]').text(), '30%')
      assert.notExists(li.find('[data-testid="image"]'))
    })
  })
})
