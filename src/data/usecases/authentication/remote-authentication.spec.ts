import { RemoteAuthentication } from './remote-authentication';

export class HttpPostClientSpy implements HttpPostClientSpy {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return undefined;
  }
}
describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
