import React from 'react';
import Signup from './signup';
import { Helper, ValidationStub } from '@/presentation/test';
import { RenderResult, cleanup, render } from '@testing-library/react';
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
    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });
});
