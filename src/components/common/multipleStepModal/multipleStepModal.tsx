import { BaseProps } from '@/types/global.types'
import { createContext, useState } from 'react'
import { MultipleStepModalContextType, MultipleStepState } from './multipleStepModal.types'

const initialState: MultipleStepState = 0
export const MultipleStepModalContext = createContext<MultipleStepModalContextType | null>(null)

const MultipleStepModal: BaseProps = (props) => {
  const { children } = props
  const [currentStepIndex, setCurrentStepIndex] = useState<MultipleStepState>(initialState)
  return <MultipleStepModalContext.Provider value={{ currentStepIndex, setCurrentStepIndex }}>{children}</MultipleStepModalContext.Provider>
}

export default MultipleStepModal
