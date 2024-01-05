import React from 'react';
import { Login } from '@/presentation/pages';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios/axios-http-client';
import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';

export const makeLogin: React.FC = () => {
  const url = 'http://localhost:5050/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
  ]);
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};
