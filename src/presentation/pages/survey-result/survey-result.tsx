import { LoadSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import { SurveyResulData } from '@/presentation/pages/survey-result/components'

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

  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-200  ">
      <Header />
      <div
        data-testid="survey-result"
        className="flex flex-col self-center max-w-[800px] w-full flex-grow p-[40px] skeletonResult"
      >
        {state.surveyResult && <SurveyResulData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
