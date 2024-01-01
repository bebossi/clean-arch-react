import React, { memo } from 'react';
import Logo from '../Logo/logo';

const LoginHeader: React.FC = () => {
  return (
    <header className="bg-rose-700 flex flex-col border-t-[40px] border-t-rose-900 items-center">
      <Logo />
      <h1 className="text-white mt-[16px] mb-[40px] ">
        4Dev - Poll for developers
      </h1>
    </header>
  );
};

export default memo(LoginHeader);
