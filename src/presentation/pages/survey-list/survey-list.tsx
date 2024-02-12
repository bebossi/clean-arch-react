/* eslint-disable multiline-ternary */
import React, { useContext, useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import {
  Error,
  SurveyContext,
  SurveyListItem,
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

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
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          navigate('/login')
        } else {
          setState({ ...state, error: error.message })
        }
      })
  }, [state.reload])

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
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
