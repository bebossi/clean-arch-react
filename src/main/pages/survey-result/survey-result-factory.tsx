import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import { matchPath } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeSurveyResult = () => {
  const path = matchPath({ path: '/surveys/:id' }, window.location.pathname)
  // console.log(path.params.id)
  return (
    path && <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(path.params.id)} />
  )
}
