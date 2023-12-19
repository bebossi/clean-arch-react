import { HttpPostClientSpy } from 'data/test/mock-http-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy
  ) {}

  async auth(): Promise<void> {
    await this.httpPostClient.post({ url: this.url });
  }
}
