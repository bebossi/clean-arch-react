import { SurveyResultAnswerModel } from '@/domain/models'
import React, { useContext } from 'react'
import { SurveyResulContext } from '@/presentation/pages/survey-result/components'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const { onAnswer } = useContext(SurveyResulContext)

  const answerClick = (e: React.MouseEvent): void => {
    if (e.currentTarget.classList.contains('active')) return
    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      className="flex justify-between bg-white items-center p-[16px] rounded-md text-rose-950 mt-[16px] active:border-[2px] active:border-rose-950 "
      onClick={answerClick}
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
  )
}

export default Answer
