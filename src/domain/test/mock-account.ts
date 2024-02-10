import { faker } from '@faker-js/faker'
import { AccountModel } from '../models'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
  name: faker.person.fullName(),
})
