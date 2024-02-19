import React from 'react'
import SurveyItem from './survey-item'
import { mockSurveyModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      'http://localhost/icon-thumb-up.png'
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      'http://localhost/icon-thumb-down.png'
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
