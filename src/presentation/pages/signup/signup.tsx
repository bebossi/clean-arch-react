import React, { useEffect, useState } from 'react';
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/usecases';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: 'Required field',
    passwordConfirmationError: 'Required field',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      ),
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (state.isLoading) {
      return;
    }
    setState({
      ...state,
      isLoading: true,
    });
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    });
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
          data-testid="form"
          className="flex flex-col w-[400px] bg-white p-[40px] rounded-lg self-center shadow-md"
        >
          <h2 className="text-rose-900 text-center text-xl font-bold ">Sign up</h2>
          <Input
            className="flex-grow pl-[8px] pr-[40px] border border-rose-500 leading-[40px] rounded-[4px] focus:outline-rose-500 "
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <Input
            className="flex-grow pl-[8px] pr-[40px] border border-rose-500 leading-[40px] rounded-[4px] focus:outline-rose-500 "
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <Input
            className="flex-grow pl-[8px] pr-[40px] border border-rose-500 leading-[40px] rounded-[4px] focus:outline-rose-500 "
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <Input
            className="flex-grow pl-[8px] pr-[40px] border border-rose-500 leading-[40px] rounded-[4px] focus:outline-rose-500 "
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm your password"
          />
          <button
            disabled={
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError ||
              !!state.nameError
            }
            data-testid="submit"
            className="bg-rose-500 mt-[32px] text-white rounded-lg text-base border-none leading-[60px"
          >
            Sign up
          </button>
          <span className="text-center text-rose-500 mt-[16px] cursor-pointer hover:underline">
            <span data-testid="signup">Already have an account? Login page</span>
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Signup;
