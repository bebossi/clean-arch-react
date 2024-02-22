import React from 'react'
import SurveyItem from './survey-item'
import { mockSurveyModel } from '@/domain/test'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { MemoryHistory, createMemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router location={history.location} navigator={history}>
      <SurveyItem survey={survey} />
    </Router>
  )
  return {
    history,
  }
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

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
