import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('anyField');
    const fieldValidationSpy2 = new FieldValidationSpy('anyField');
    fieldValidationSpy2.error = new Error('error');
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);
    const error = sut.validate('anyField', 'anyValue');
    expect(error).toBe('error');
  });
});
