import React from 'react'

type Props = {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ className, date }) => {
  return (
    <time
      className={`flex flex-col bg-rose-500 text-white rounded-md ml-[24px] self-center justify-center items-center w-[60px] h-[100px] flex-shrink-0 ${className}`}
    >
      <span data-testid="day" className="text-[40px] font-bold ">
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid="month" className="lowercase  ">
        {date.toLocaleString('pt-BT', { month: 'short' }).replace('.', '')}
      </span>
      <span data-testid="year" className="text-[16px]">
        {date.getFullYear()}
      </span>
    </time>
  )
}

export default Calendar
