import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyList: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message, surveyResult: null })
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false,
  })

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((old) => ({ ...old, surveyResult }))
      })
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState((old) => ({
      surveyResult: null,
      error: '',
      reload: !old.reload,
      isLoading: false,
    }))
  }

  const navigate = useNavigate()
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
              <Calendar date={state.surveyResult.date} className="w-[80px] mr-4 " />
              <h2 data-testid="question" className="text-rose-950 text-[28px] font-bold">
                {state.surveyResult.question}{' '}
              </h2>
            </hgroup>
            <ul data-testid="answers" className="list-none flex flex-col">
              {state.surveyResult.answers.map((answer) => (
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
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
