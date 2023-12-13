export class HttpPostClientSpy implements HttpPostClientSpy {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return undefined;
  }
}
