import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('anyField').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('anyField')]);
  });

  test('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('anyField').email().build();
    expect(validations).toEqual([new EmailValidation('anyField')]);
  });

  test('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('anyField')
      .minLength(5)
      .build();
    expect(validations).toEqual([new MinLengthValidation('anyField', 5)]);
  });
});
