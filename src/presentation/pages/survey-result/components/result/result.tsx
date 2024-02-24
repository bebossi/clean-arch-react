import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
          <li
            data-testid="answer-wrap"
            key={answer.answer}
            className="flex justify-between bg-white items-center p-[16px] rounded-md text-rose-950 mt-[16px] active:border-[2px] active:border-rose-950 "
          >
            {answer.image && (
              <img
                data-testid="image"
                src={answer.image}
                alt={answer.answer}
                className="w-[50px] h-[50px] mr-4"
              />
            )}
            <span data-testid="answer" className="flex-grow mr-4 text-[20px]">
              {answer.answer}
            </span>
            <span data-testid="percent" className="text-[30px]">
              {answer.percent}%
            </span>
          </li>
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
