/* eslint-disable no-constant-condition */
import React, { useState } from 'react';
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Required field',
    emailError: 'Required field',
    passwordError: 'Required field',
    passwordConfirmationError: 'Required field',
    mainError: '',
  });

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className="flex flex-col w-[400px] bg-white p-[40px] rounded-lg self-center shadow-md">
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
            disabled
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
