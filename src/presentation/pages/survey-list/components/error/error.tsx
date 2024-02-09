import React, { useContext } from 'react'
import { SurveyContext } from '@/presentation/pages/survey-list/components'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  return (
    <div className="flex flex-col bg-white p-[40px] items-center text-center rounded-md shadow-md ">
      <span className="text-[20px] mb-[] " data-testid="error">
        {state.error}
      </span>
      <button
        className=" mt-[32px] px-4 text-white rounded-lg text-base border-none leading-[50px] bg-rose-500 "
        data-testid="reload"
        onClick={() => setState({ surveys: [], error: '', reload: !state.reload })}
      >
        Reload
      </button>
    </div>
  )
}

export default Error
