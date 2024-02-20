import React from 'react'
type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className="flex flex-col bg-white p-[40px] items-center text-center rounded-md shadow-md ">
      <span className="text-[20px] mb-[] " data-testid="error">
        {error}
      </span>
      <button
        className=" mt-[32px] px-4 text-white rounded-lg text-base border-none leading-[50px] bg-rose-500 "
        data-testid="reload"
        onClick={reload}
      >
        Reload
      </button>
    </div>
  )
}

export default Error
