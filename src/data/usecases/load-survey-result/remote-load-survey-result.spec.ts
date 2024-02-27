import { faker } from '@faker-js/faker'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel(),
    }
    await sut.load()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw AccessDeniedError if HttClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a SurveyResult on 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyResultModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const httpResponse = await sut.load()
    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date),
    })
  })
})
