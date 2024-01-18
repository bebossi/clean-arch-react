import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import Signup from './signup';

type SutTypes = {
  sut: RenderResult;
};
const makeSut = (): SutTypes => {
  const sut = render(<Signup />);
  return {
    sut,
  };
};
const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};
const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};
const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'OK');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};
describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Required field';
    const { sut } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
