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
import { Authentication } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }
      setState({
        ...state,
        isLoading: true,
      });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem('accessToken', account.accessToken);
      navigate('/');
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        mainError: err.message,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
          className="flex flex-col w-[400px] bg-white p-[40px] rounded-lg self-center shadow-md"
        >
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
            disabled={!!state.emailError || !!state.passwordError}
            className={`bg-rose-500 mt-[32px] text-white rounded-lg text-base border-none leading-[60px] ${
              !!state.emailError || !!state.passwordError
                ? 'bg-gray-400 text-gray-700 hover:opacity-100'
                : ''
            }`}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-center text-rose-500 mt-[16px] cursor-pointer hover:underline"
          >
            <span data-testid="signup">Register</span>
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
