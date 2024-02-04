import { GetStorage, SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
