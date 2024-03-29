import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';
import { makeSignupValidation } from './signup-validation-factory';

describe('SignupValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().minLength(3).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(5).build(),
        ...ValidationBuilder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build(),
      ])
    );
  });
});
