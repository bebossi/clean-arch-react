import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases'

export const makeSignup: React.FC = () => {
  return (
    <Signup addAccount={makeRemoteAddAccount()} validation={makeSignupValidation()} />
  )
}
