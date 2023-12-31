import React from 'react';
import '../../../main/config/style.css';
import Spinner from '@/presentation/components/spinner';
const Login: React.FC = () => {
  console.log('ola');
  return (
    <div className="flex flex-col h-screen justify-between bg-slate-100">
      <header className="bg-rose-700 flex flex-col border-t-[40px] border-t-rose-900 items-center">
        <img
          className="mt-[40px]"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iODdweCIgdmlld0JveD0iMCAwIDEyMCA4NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTMuMiAoNzI2NDMpIC0gaHR0cHM6Ly9za2V0Y2hhcHAuY29tIC0tPgogICAgPHRpdGxlPkdyb3VwIENvcHk8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9naW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NTIuMDAwMDAwLCAtNzkuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ1Mi4wMDAwMDAsIDc5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQ2LjQ2NDY0NjUsLTIuMTMxNjI4MjFlLTE0IEw3OC4wNjE3Mzg2LC0yLjEzMTYyODIxZS0xNCBDMTAzLjkwMzAwNCwtMi4xMzE2MjgyMWUtMTQgMTE5LjE5MTkxOSwxNS43MTIyMTU3IDExOS4xOTE5MTksNDMuMjIzNjQzMiBDMTE5LjE5MTkxOSw3MC43MzUwNzA3IDEwMy45NjI5Niw4Ni44Njg2ODY5IDc4LjA2MTczODYsODYuODY4Njg2OSBMNDYuNDY0NjQ2NSw4Ni44Njg2ODY5IEw0Ni40NjQ2NDY1LC0yLjEzMTYyODIxZS0xNCBaIE02MS45MzM0MzE2LDEzLjEyMzYxMzEgTDYxLjkzMzQzMTYsNzMuNzQ1MDczNyBMNzYuNDQyOTEyMiw3My43NDUwNzM3IEM5My44MzAzMDY0LDczLjc0NTA3MzcgMTAzLjQyMzM1MSw2My4wODk2NjMxIDEwMy40MjMzNTEsNDMuMjgzODQzMyBDMTAzLjQyMzM1MSwyMy44MzkyMjM4IDkzLjcxMDM5MzMsMTMuMTIzNjEzMSA3Ni40NDI5MTIyLDEzLjEyMzYxMzEgTDYxLjkzMzQzMTYsMTMuMTIzNjEzMSBaIiBpZD0iRCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQ1LjE0MTA2NTgsODYuODY4Njg2OSBMNDUuMTQxMDY1OCw3MC40MzQwNzA0IEwwLDcwLjQzNDA3MDQgTDAsNTcuMDY5NjU3MSBDNy44MzY5OTA2LDQyLjg2MjQ0MjkgMTcuOTMxMDM0NSwyNy4zOTEwMjc0IDM3LjU1NDg1ODksLTIuMTMxNjI4MjFlLTE0IEw2MC41NjQyNjMzLC0yLjEzMTYyODIxZS0xNCBMNjAuNTY0MjYzMyw1Ny43MzE4NTc3IEw3Mi43MjcyNzI3LDU3LjczMTg1NzcgTDcyLjcyNzI3MjcsNzAuNDM0MDcwNCBMNjAuNTY0MjYzMyw3MC40MzQwNzA0IEw2MC41NjQyNjMzLDg2Ljg2ODY4NjkgTDQ1LjE0MTA2NTgsODYuODY4Njg2OSBaIE0xNC42NzA4NDY0LDU3LjY3MTY1NzcgTDE0LjY3MDg0NjQsNTguMDkzMDU4MSBMNDUuMzkxODQ5NSw1OC4wOTMwNTgxIEw0NS4zOTE4NDk1LDExLjQ5ODIxMTUgTDQ1LjE0MTA2NTgsMTEuNDk4MjExNSBDMzAuNTMyOTE1NCwzMS44NDU4MzE4IDIxLjg4MDg3NzcsNDQuNjY4NDQ0NyAxNC42NzA4NDY0LDU3LjY3MTY1NzcgWiIgaWQ9IjQiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
        />
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
