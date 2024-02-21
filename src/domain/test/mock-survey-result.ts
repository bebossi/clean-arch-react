import { faker } from '@faker-js/faker'
import { LoadSurveyResult } from '../usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.word.words(),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int({ max: 100 }),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int({ max: 100 }),
      isCurrentAccountAnswer: false,
    },
  ],
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()
  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.surveyResult
  }
}
