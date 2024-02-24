import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }) => {
  const navigate = useNavigate()

  return (
    <>
      <hgroup className="flex flex-row items-center mb-4  ">
        <Calendar date={surveyResult.date} className="w-[80px] mr-4 " />
        <h2 data-testid="question" className="text-rose-950 text-[28px] font-bold">
          {surveyResult.question}{' '}
        </h2>
      </hgroup>
      <ul data-testid="answers" className="list-none flex flex-col">
        {surveyResult.answers.map((answer) => (
          <SurveyResultAnswer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button
        data-testid="back-button"
        onClick={() => {
          navigate(-1)
        }}
        className="bg-rose-500 leading-[50px] text-white rounded-md text-[20px] px-[16px] mt-[16px] outline-none "
      >
        Voltar
      </button>
    </>
  )
}

export default Result
