import { Logo } from '@/presentation/components'
import Footer from '@/presentation/components/Footer/footer'
import React from 'react'

const SurveyList: React.FC = () => {
  return (
    // Surveylistwrap
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-300 ">
      {/* // HeaderWrap */}
      <header className="flex justify-center bg-rose-500 border-t-[40px] border-solid border-rose-950 ">
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
      {/* content wrap */}
      <div className="flex flex-col self-center w-full max-w-[800px] flex-grow p-[40px] mb-[24px] ">
        <h2 className="text-rose-950 text-[20px] font-bold uppercase  ">Pools</h2>
        <ul className="flex flex-row flex-wrap justify-between  ">
          <li className="h-[250px] bg-white flex flex-col justify-between rounded-lg basis-[48%] mb-[24px] shadow-md  ">
            {/* survey content */}
            <div className="flex flex-row relative  rounded-t-md justify-between flex-grow bg-no-repeat bg-gradient-to-r from-rose-500 to-rose-500 linear-gradient ">
              <div className="absolute -top-3 -right-3 bg-red-500 p-[10px] rounded-full flex shadow-md">
                <img src="./icon-thumb-up.png" />
              </div>
              <time className="flex flex-col bg-rose-500 text-white rounded-md ml-[24px] self-center justify-center items-center w-[60px] h-[100px] flex-shrink-0 ">
                <span className="text-[40px] font-bold ">22</span>
                <span className="lowercase  ">03</span>
                <span className="text-[16px]">2024</span>
              </time>
              <p className="text-[18px] m-[24px] self-center ">
                What are your favorite web framework
              </p>
            </div>
            <footer className="bg-rose-500 text-white leading-[40px] lowercase text-center cursor-pointer hover:bg-rose-950 rounded-b-md ">
              See result
            </footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
