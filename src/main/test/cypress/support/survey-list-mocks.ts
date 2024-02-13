import * as Http from './http-mocks'

export const mockUnexpectedError = (): void => {
  Http.mockServerError(/surveys/, 'GET')
}
export const mockAccessdeniedError = (): void => {
  Http.mockForbiddenError(/surveys/, 'GET')
}
