/* eslint-disable no-constant-condition */
import React, { useState, useEffect } from 'react';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: 'Required field',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
    });
  }, [state.email]);
  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password]);

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className="flex flex-col w-[400px] bg-white p-[40px] rounded-lg self-center shadow-md">
          <h2 className="text-rose-900 text-center text-xl font-bold ">
            LOGIN
          </h2>
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
          <button
            data-testid="submit"
            disabled={true}
            className={`bg-gray-200 mt-[32px] text-white rounded-lg text-base border-none leading-[60px] ${
              true ? 'bg-gray-400 text-gray-700 hover:opacity-100' : ''
            }`}
          >
            Login
          </button>
          <span className="text-center text-rose-500 mt-[16px] cursor-pointer hover:underline">
            Register
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
