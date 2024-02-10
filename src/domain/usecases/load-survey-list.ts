export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export type Model = {
    id: string
    question: string
    answers: Array<{
      image?: string
      answer: string
    }>
    date: Date
    didAnswer: boolean
  }
}
