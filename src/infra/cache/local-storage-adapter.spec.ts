/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()
describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should call localStorage with correct value ', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.string.alpha()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
