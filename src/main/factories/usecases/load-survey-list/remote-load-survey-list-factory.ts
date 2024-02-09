import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { LoadSurveyList } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/survey'), makeAxiosHttpClient())
}
