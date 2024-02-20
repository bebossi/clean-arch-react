/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Footer, Header, Error } from '@/presentation/components'
import {
  SurveyContext,
  SurveyListItem,
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState({ ...state, surveys })
      })
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState((old) => ({
      surveys: [],
      error: '',
      reload: !old.reload,
    }))
  }

  return (
    // Surveylistwrap
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-300 ">
      <Header />
      {/* content wrap */}
      <div className="flex flex-col self-center w-full max-w-[800px] flex-grow p-[40px] mb-[24px]  ">
        <h2
          data-testid="heading"
          className="text-rose-950 text-[20px] font-bold uppercase  "
        >
          Pools
        </h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? (
            <Error error={state.error} reload={reload} />
          ) : (
            <SurveyListItem />
          )}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
