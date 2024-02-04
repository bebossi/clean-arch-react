/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'
import { AccountModel } from '@/domain/models'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()
describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should call localStorage with correct value ', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.helpers.objectEntry<AccountModel>({
      name: faker.person.fullName(),
      accessToken: faker.string.uuid(),
    })
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
