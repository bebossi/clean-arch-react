import { createContext } from 'react'

type Props = {
  onAnswer: (anser: string) => void
}

export default createContext<Props>(null)
