import { faker } from '@faker-js/faker';
import { LocalSaveAccessToken } from './local-save-access-token';
import { SetStorageSpy } from '@/data/test/mock-storage';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return {
    sut,
    setStorageSpy,
  };
};

describe('LocalSaveAccessToekn', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageSpy } = makeSut();
    const accesToken = faker.string.uuid();
    await sut.save(accesToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accesToken);
  });
});
