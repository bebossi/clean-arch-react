import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};
const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('anyField'),
    new FieldValidationSpy('anyField'),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut();
    fieldValidationsSpy[0].error = new Error('firstError');
    fieldValidationsSpy[1].error = new Error('secondError');
    const error = sut.validate('anyField', 'anyValue');
    expect(error).toBe('firstError');
  });
});
