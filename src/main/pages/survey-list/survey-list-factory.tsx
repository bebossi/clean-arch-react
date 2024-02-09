import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeSurveyList = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
}
