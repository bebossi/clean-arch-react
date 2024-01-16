import { faker } from '@faker-js/faker';
import { AddAccountParams } from '../usecases';

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.person.firstName(),
    email: faker.internet.url(),
    password,
    passwordConfirmation: password,
  };
};
