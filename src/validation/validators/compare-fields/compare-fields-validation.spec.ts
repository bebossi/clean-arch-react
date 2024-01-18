import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column());

describe('CompareFieldsValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});
