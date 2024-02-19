import React from 'react'
import Spinner from '../Spinner/spinner'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-white bg-opacity-80 fixed top-0 left-0 right-0 bottom-0 cursor-wait ">
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-90 w-[300px] h-[150px] rounded-md text-white ">
        <span className="font-[16px]">Wait ...</span>
        <Spinner />
      </div>
    </div>
  )
}

export default Loading
