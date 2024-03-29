import { faker } from '@faker-js/faker'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.word.words(),
})

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

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  surveyResult = mockSurveyResultModel()
  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params
    return this.surveyResult
  }
}
