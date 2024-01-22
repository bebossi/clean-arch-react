import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';
import { faker } from '@faker-js/faker';
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation';
describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).minLength(5).build();
    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();

    const validations = ValidationBuilder.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)]);
  });

  test('Should return a list of Validations', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field)
      .required()
      .email()
      .minLength(5)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, 5),
    ]);
  });
});
