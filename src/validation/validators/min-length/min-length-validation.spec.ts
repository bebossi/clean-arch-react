import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';

import { faker } from '@faker-js/faker';

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5);
describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: faker.string.alphanumeric({ length: { min: 0, max: 4 } }),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: faker.string.alphanumeric({ length: { min: 5, max: 18 } }),
    });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if field does not exist in schema', () => {
    const sut = makeSut(faker.database.column());
    const error = sut.validate({
      [faker.database.column()]: faker.string.alphanumeric({
        length: { min: 5, max: 18 },
      }),
    });
    expect(error).toBeFalsy();
  });
});
