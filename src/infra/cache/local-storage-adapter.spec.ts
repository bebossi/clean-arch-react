/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()
describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should call localStorage.setItem with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.helpers.objectEntry<{}>({
      name: faker.person.fullName(),
      accessToken: faker.string.uuid(),
    })
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.removeItem if value is null', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  test('Should call localStorage.getItem with correct value ', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.helpers.objectEntry<{}>({
      name: faker.person.fullName(),
      accessToken: faker.string.uuid(),
    })
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
