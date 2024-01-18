import React from 'react';
import Signup from './signup';
import { Helper, ValidationStub } from '@/presentation/test';
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Signup validation={validationStub} />);
  return {
    sut,
  };
};

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.word.verb()
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};
describe('Signup Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.word.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', 'Required field');
    Helper.testStatusForField(sut, 'password', 'Required field');
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Required field');
  });

  test('Should show nameError if validation fails', () => {
    const validationError = faker.word.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });
});
