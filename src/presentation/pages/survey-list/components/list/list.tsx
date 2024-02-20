/* eslint-disable multiline-ternary */
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import React from 'react'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul
      data-testid="survey-list"
      className="flex flex-col sm:flex-row flex-wrap justify-between h-full "
    >
      {surveys.length ? (
        surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  )
}

export default List
