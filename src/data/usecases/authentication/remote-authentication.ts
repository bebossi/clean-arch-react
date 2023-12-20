import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentials';
import { AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
    }
  }
}
