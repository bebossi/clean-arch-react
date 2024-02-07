import React, { useContext } from 'react'
import { SurveyContext } from '@/presentation/pages/survey-list/components'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)
  // const reload = (): void => {
  //   setState({ surveys: [], error: '', reload: !state.reload })
  // }

  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button
        data-testid="reload"
        onClick={() => setState({ surveys: [], error: '', reload: !state.reload })}
      >
        Reload
      </button>
    </div>
  )
}

export default Error
