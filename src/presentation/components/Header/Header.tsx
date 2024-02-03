import React, { memo } from 'react'
import Logo from '../Logo/logo'

const Header: React.FC = () => {
  return (
    // {/* // HeaderWrap */}
    <header className="flex justify-center bg-rose-500 border-t-[20px] sm:border-t-[40px] border-solid border-rose-950 ">
      {/* Header content */}
      <div className="flex flex-row flex-grow px-[40px] py-[24px] justify-between max-w-[800px]">
        <Logo />
        {/* Logou wrap */}
        <div className="flex flex-col items-end text-white justify-center self-center">
          <span className="text-[16px] mb-[8px] ">Bernardo</span>
          <a className="hover:underline" href="#">
            Logout
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
