import { useContext } from 'react'
import { MultipleStepModalContext } from './multipleStepModal'

export const useMultipleStepModal = () => {
  const context = useContext(MultipleStepModalContext)

  if (!context) {
    throw new Error('useMultipleStepModal must be used within a HoldToActionProvider')
  }

  return context
}

export const useMultiStepModal = (steps: number) => {
  const { setCurrentStepIndex, currentStepIndex } = useMultipleStepModal()

  const reset = () => {
    setCurrentStepIndex(0)
  }

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps - 1) return i
      return i + 1
    })
  }

  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }

  const goTo = (index: number) => {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps - 1,
    goTo,
    next,
    back,
    reset,
  }
}
