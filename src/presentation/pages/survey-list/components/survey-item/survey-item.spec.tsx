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
      date: new Date('2023-01-10T00:00:00'),
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      'http://localhost/icon-thumb-up.png'
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2024-05-03T00:00:00'),
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      'http://localhost/icon-thumb-down.png'
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
  })
})
