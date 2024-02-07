/* eslint-disable multiline-ternary */
import { SurveyModel } from '@/domain/models'
import {
  SurveyItem,
  SurveyItemEmpty,
  SurveyContext,
} from '@/presentation/pages/survey-list/components'
import React, { useContext } from 'react'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
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
  )
}

export default List
