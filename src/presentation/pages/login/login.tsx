import React from 'react';
import '../../../main/config/style.css';
import Spinner from '@/presentation/components/spinner';
import Logo from '@/presentation/components/logo';
const Login: React.FC = () => {
  console.log('ola');
  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <header className="bg-rose-700 flex flex-col border-t-[40px] border-t-rose-900 items-center">
        <Logo />
        <h1 className="text-white mt-[16px] mb-[40px] ">
          4Dev - Poll for developers
        </h1>
      </header>
      <form className="flex flex-col w-[400px] bg-white p-[40px] rounded-lg self-center shadow-md">
        <h2 className="text-rose-950 text-center text-xl font-bold ">LOGIN</h2>
        <div className="flex  relative items-center  mt-[16px] ">
          <input
            className="flex-grow pl-[8px] pr-[40px] border border-rose-500 leading-[40px] rounded-[4px] focus:outline-rose-500 "
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <span className="absolute right-8 text-xs cursor-help">🔴</span>
        </div>
        <div className="flex  relative items-center  mt-[16px] ">
          <input
            className="flex-grow pl-[8px] pr-[40px] border border-rose-500 leading-[40px] rounded-[4px] focus:outline-rose-500 "
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          {/* <span>🟢</span> */}
          <span className="absolute right-8 text-xs cursor-help">🔴</span>
        </div>
        <button className="bg-rose-700 mt-[32px] text-white rounded-lg text-base border-none leading-[60px] hover:opacity-90">
          Login
        </button>
        <span className="text-center text-rose-500 mt-[16px] cursor-pointer hover:underline">
          Register
        </span>
        <div className="flex flex-col items-center ">
          <Spinner />
          <span className="mt-[30px] text-rose-500">Error</span>
        </div>
      </form>
      <footer className="bg-rose-900 h-[48px]"></footer>
    </div>
  );
};

export default Login;
