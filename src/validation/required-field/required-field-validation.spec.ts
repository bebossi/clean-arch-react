import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation';
import { RequiredFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';

describe('RequidFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate(faker.word.words());
    expect(error).toBeFalsy();
  });
});
