import { faker } from '@faker-js/faker';
import { LocalSaveAccessToken } from './local-save-access-token';
import { SetStorageSpy } from '@/data/test/mock-storage';

describe('LocalSaveAccessToekn', () => {
  test('Should call SetStorage with correct values', async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const accesToken = faker.string.uuid();
    await sut.save(accesToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accesToken);
  });
});
