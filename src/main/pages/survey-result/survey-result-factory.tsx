import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import { useParams } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeSurveyResult = () => {
  const { id } = useParams()
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
}
