import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import {
  SurveyResulContext,
  SurveyResulData,
} from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({
      ...old,
      error: error.message,
      surveyResult: null,
      isLoading: false,
    }))
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

  const onAnswer = (answer: string): void => {
    setState((old) => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer }).then().catch(handleError)
  }

  const reload = (): void => {
    setState((old) => ({
      surveyResult: null,
      error: '',
      reload: !old.reload,
      isLoading: false,
    }))
  }

  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-200  ">
      <Header />
      <SurveyResulContext.Provider value={{ onAnswer }}>
        <div
          data-testid="survey-result"
          className="flex flex-col self-center max-w-[800px] w-full flex-grow p-[40px] skeletonResult"
        >
          {state.surveyResult && <SurveyResulData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResulContext.Provider>

      <Footer />
    </div>
  )
}

export default SurveyResult
