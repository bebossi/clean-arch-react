import { HttpPostClientSpy } from 'data/test/mock-http-client';
import { AuthenticationParams } from 'domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params });
  }
}
