/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  })

  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => {
      setState({ surveys })
    })
  }, [])

  return (
    // Surveylistwrap
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-300 ">
      <Header />
      {/* content wrap */}
      <div className="flex flex-col self-center w-full max-w-[800px] flex-grow p-[40px] mb-[24px]  ">
        <h2 className="text-rose-950 text-[20px] font-bold uppercase  ">Pools</h2>
        <ul
          data-testid="survey-list"
          className="flex flex-col sm:flex-row flex-wrap justify-between h-full "
        >
          {state.surveys.length ? (
            state.surveys.map((survey: SurveyModel) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
