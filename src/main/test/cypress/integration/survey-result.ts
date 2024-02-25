/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET')
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
})
