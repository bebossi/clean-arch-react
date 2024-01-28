import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock,
  }
}

describe('LocalSaveAccessToekn', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const accesToken = faker.string.uuid()
    await sut.save(accesToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accesToken)
  })

  test('Should trhow is SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.string.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should trhow if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
