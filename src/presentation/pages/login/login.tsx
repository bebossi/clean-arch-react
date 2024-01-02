import React, { useState } from 'react';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/components/contexts/form/form-context';

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <LoginHeader />
      <Context.Provider value={state}>
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
          <button className="bg-rose-700 mt-[32px] text-white rounded-lg text-base border-none leading-[60px] hover:opacity-90">
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
