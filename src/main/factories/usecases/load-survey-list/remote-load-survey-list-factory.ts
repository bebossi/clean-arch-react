import { LoadSurveyList } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    makeAuthorizeHttpGetClientDecorator()
  )
}
