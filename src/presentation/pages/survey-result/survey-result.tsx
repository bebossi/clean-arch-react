import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyList: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  })
  useEffect(() => {
    loadSurveyResult.load()
  }, [])
  return (
    // SurveyResultWrap
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-200  ">
      <Header />
      {/* // Content wrap */}
      <div
        data-testid="survey-result"
        className="flex flex-col self-center max-w-[800px] w-full flex-grow p-[40px] skeletonResult"
      >
        {state.surveyResult && (
          <>
            <hgroup className="flex flex-row items-center mb-4  ">
              <Calendar date={new Date()} className="w-[80px] mr-4 " />
              <h2 className="text-rose-950 text-[28px] font-bold">
                Qual seu framework web fav?
              </h2>
            </hgroup>
            {/* answers list */}
            <ul className="list-none flex flex-col">
              <li className="flex justify-between bg-white items-center p-[16px] rounded-md text-rose-950 mt-[16px] active:border-[2px] active:border-rose-950 ">
                <img src="" className="w-[50px] h-[50px] mr-4" />
                {/* //Styles answer */}
                <span className="flex-grow mr-4 text-[20px]">React.js</span>
                {/* //percent */}
                <span className="text-[30px]">50%</span>
              </li>
              <li className="flex justify-between bg-white items-center p-[16px] rounded-md text-rose-950 mt-[16px] active:border-[2px] active:border-rose-950 ">
                <img src="" className="w-[50px] h-[50px]" />
                {/* //Styles answer */}
                <span className="flex-grow mx-4 text-[20px]">React.js</span>
                {/* //percent */}

                <span className="text-[30px]">50%</span>
              </li>{' '}
              <li className="flex justify-between bg-white items-center p-[16px] rounded-md text-rose-950 mt-[16px] active:border-[2px] active:border-rose-950 ">
                <img src="" className="w-[50px] h-[50px]" />
                {/* //Styles answer */}
                <span className="flex-grow mx-4 text-[20px]">React.js</span>
                {/* //percent */}
                <span className="text-[30px]">50%</span>
              </li>
            </ul>
            <button className="bg-rose-500 leading-[50px] text-white rounded-md text-[20px] px-[16px] mt-[16px] outline-none ">
              Voltar
            </button>
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
