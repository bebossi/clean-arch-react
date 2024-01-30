export type HttpGetParams = {
  url?: string
}

export interface HttpGetClient {
  get: (param: HttpGetParams) => Promise<void>
}
