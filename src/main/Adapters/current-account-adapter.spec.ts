import { mockAccountModel } from '@/domain/test'
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapterwith.set correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should call LocalStorageAdapterwith.get correct value', () => {
    const account = mockAccountModel()
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const result = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
