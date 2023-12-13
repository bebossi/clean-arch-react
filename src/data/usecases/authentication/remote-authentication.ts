import { HttpPostClientSpy } from './remote-authentication.spec';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy
  ) {}

  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url);
  }
}
