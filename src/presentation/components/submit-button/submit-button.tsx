import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
}
const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)
  console.log(state.isFormInvalid)
  return (
    <button
      disabled={state.isFormInvalid}
      type="submit"
      data-testid="submit"
      className={` mt-[32px] text-white rounded-lg text-base border-none leading-[50px] ${
        state.isFormInvalid
          ? 'bg-gray-400 text-gray-700 hover:opacity-100'
          : 'bg-rose-500'
      }`}
    >
      {text}
    </button>
  )
}

export default SubmitButton
