import { Dispatch, SetStateAction } from 'react'

export type MultipleStepState = number

export interface MultipleStepModalContextType {
  currentStepIndex: MultipleStepState
  setCurrentStepIndex: Dispatch<SetStateAction<MultipleStepState>>
}
