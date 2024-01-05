import { RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('anyField').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('anyField')]);
  });
});
