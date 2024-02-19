import { LoadSurveyList } from '@/domain/usecases'
import { Calendar, Icon, IconName } from '@/presentation/components'
import React from 'react'

type Props = {
  survey: LoadSurveyList.Model
}
const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className="h-[250px]  bg-white flex flex-col justify-between rounded-lg  sm:basis-[48%] mb-[24px] shadow-md  ">
      {/* survey content */}
      <div className="flex flex-row relative  rounded-t-md justify-between flex-grow bg-no-repeat bg-gradient-to-r from-rose-500 to-rose-500 linear-gradient ">
        <Icon iconName={iconName} />
        <Calendar date={survey.date} />
        <p data-testid="question" className="text-[18px] m-[24px] self-center flex-grow ">
          {survey.question}
        </p>
      </div>
      <footer className="bg-rose-500 text-white leading-[40px] lowercase text-center cursor-pointer hover:bg-rose-950 rounded-b-md ">
        See result
      </footer>
    </li>
  )
}

export default SurveyItem
