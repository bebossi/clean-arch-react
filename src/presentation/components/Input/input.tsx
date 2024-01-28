/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  return (
    <div className="relative mt-[40px] border-b-2 border-dashed border-gray-700  after:content-[''] after:w-full after:h-[0.5px] after:border after:border-rose-500 after:absolute after:bottom-0 after:left-0  after:origin-[0%] after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out after-focus-within ">
      <input
        {...props}
        placeholder=""
        className="border-none outline-none w-full leading-[24px] pl-2 pr-10"
        data-testid={props.name}
        onChange={(e) => {
          setState({
            ...state,
            [e.target.name]: e.target.value,
          })
        }}
      />
      <label className="absolute left-2 text-gray-400 cursor-text translate-y-[-20px]">
        {props.placeholder}
      </label>
      <span
        title={error || 'OK'}
        data-testid={`${props.name}-status`}
        className="absolute right-2 text-[10px] cursor-help"
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
