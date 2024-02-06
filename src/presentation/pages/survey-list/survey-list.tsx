import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

const SurveyList: React.FC = () => {
  return (
    // Surveylistwrap
    <div className="flex flex-col justify-between min-h-[100vh] bg-gray-300 ">
      <Header />
      {/* content wrap */}
      <div className="flex flex-col self-center w-full max-w-[800px] flex-grow p-[40px] mb-[24px]  ">
        <h2 className="text-rose-950 text-[20px] font-bold uppercase  ">Pools</h2>
        <ul
          data-testid="survey-list"
          className="flex flex-col sm:flex-row flex-wrap justify-between h-full "
        >
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
