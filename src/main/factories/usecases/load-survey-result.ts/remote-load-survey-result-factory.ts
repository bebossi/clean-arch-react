import { LoadSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteLoadSurveyResult } from '@/data/usecases'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    makeAuthorizeHttpClientDecorator()
  )
}
