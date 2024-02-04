import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    localStorage.setItem(key, value)
  }
}
