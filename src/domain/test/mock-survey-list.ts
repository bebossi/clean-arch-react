import { faker } from '@faker-js/faker'
import { SurveyModel } from '../models'

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.string.uuid(),
    question: faker.word.words(),
    answers: [
      {
        answer: faker.word.words(),
        image: faker.internet.url(),
      },
      {
        answer: faker.word.words(),
        image: faker.internet.url(),
      },
    ],
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent(),
  },
]
