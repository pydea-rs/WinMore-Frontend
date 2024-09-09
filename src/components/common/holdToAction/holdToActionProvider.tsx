import { BaseProps } from '@/types/global.types'
import { createContext, useRef, useState } from 'react'
import { HoldToActionContextType, HoldToActionEvents, HoldToActionState } from './holdToActionProvider.types'

const initialState: HoldToActionState = { progress: 0, isExiting: false, keepInitialContent: false, duration: 1000 }
export const HoldToActionContext = createContext<HoldToActionContextType | null>(null)

export const HoldToActionProvider: BaseProps = ({ children }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [state, setState] = useState<HoldToActionState>(initialState)
  const { duration, progress } = state

  const disableKeepInitialContent = () => {
    setState((prevState) => ({ ...prevState, keepInitialContent: true }))
  }

  const enableKeepInitialContent = () => {
    setState((prevState) => ({ ...prevState, keepInitialContent: true }))
  }

  const setDuration = (duration: number) => {
    setState((prevState) => ({ ...prevState, duration }))
  }

  const reset = () => {
    setState((prevState) => ({ ...prevState, progress: 0, isExiting: true }))
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const onStart = ({ onFinish, resetOnFinish, keepInitialContent, disabled }: HoldToActionEvents) => {
    if (intervalRef.current) return

    setState((prevState) => ({ ...prevState, isExiting: false }))
    let startTime = Date.now()
    let isFired = false

    intervalRef.current = setInterval(() => {
      if (disabled || isFired) return

      const timeElapsed = Date.now() - startTime
      const progressValue = Math.floor(Math.min((timeElapsed / duration) * 100, 100))
      const newProgress = progressValue === 100 ? 100 : progressValue

      setState((prevState) => ({ ...prevState, progress: newProgress }))

      if (newProgress === 100) {
        isFired = true
        onFinish?.()

        if (resetOnFinish) {
          const resetDelay = keepInitialContent ? 100 : 2000
          setTimeout(reset, resetDelay)
        }
      }
    }, 10)
  }

  const onStop = () => {
    if (intervalRef.current && progress < 100) {
      reset()
    }
  }

  return (
    <HoldToActionContext.Provider value={{ setState, state, onStop, onStart, onReset: reset, setDuration, disableKeepInitialContent, enableKeepInitialContent }}>
      {children}
    </HoldToActionContext.Provider>
  )
}
