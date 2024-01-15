import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    localStorage.setItem(key, value);
  }
}
