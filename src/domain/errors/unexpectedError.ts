export class UnexpectedError extends Error {
  constructor() {
    super('Invalid Credentials');
    this.name = 'UnexpectedError';
  }
}
