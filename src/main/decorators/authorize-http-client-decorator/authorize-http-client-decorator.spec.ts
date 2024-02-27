import { HttpRequest } from '@/data/protocols/http'
import { GetStorageSpy, mockHttpRequest, HttpClientSpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}
const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)
  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if getStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      method: faker.helpers.arrayElement(['delete', 'get', 'post', 'put']),
      url: faker.internet.url(),
      headers: {
        field: faker.word.words(),
      },
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      method: faker.helpers.arrayElement(['delete', 'get', 'post', 'put']),
      url: faker.internet.url(),
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    })
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.word.words()
    const httpRequest: HttpRequest = {
      method: faker.helpers.arrayElement(['delete', 'get', 'post', 'put']),
      url: faker.internet.url(),
      headers: {
        field,
      },
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken,
    })
  })
  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httResponse = await sut.request(mockHttpRequest())
    expect(httResponse).toBe(httpClientSpy.response)
  })
})
