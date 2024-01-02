import React from 'react';
import Login from './login';
import {
  RenderResult,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { Validation } from '@/presentation/protocols/validation';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMesage: string;
  fieldName: string;
  fieldValue: string;

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMesage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
};
describe('Login Component', () => {
  afterEach(cleanup);
  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Required field');
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Required field');
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'email.com' } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe('email.com');
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toBe('password123');
  });
});
