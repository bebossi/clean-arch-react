import { HttpGetParams } from '@/data/protocols/http'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}
const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.word.words(),
      },
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    })
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.word.words()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field,
      },
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken,
    })
  })
  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httResponse = await sut.get(mockGetRequest())
    expect(httResponse).toBe(httpGetClientSpy.response)
  })
})
