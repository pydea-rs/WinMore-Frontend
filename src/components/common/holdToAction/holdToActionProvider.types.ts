import { Dispatch, SetStateAction } from 'react'

export interface HoldToActionState {
  progress: number
  isExiting?: boolean
  keepInitialContent?: boolean
  duration: number
}

export interface HoldToActionEvents {
  disabled?: boolean
  resetOnFinish?: boolean
  keepInitialContent?: boolean
  onFinish?: () => void
}

export interface HoldToActionContextType {
  state: HoldToActionState
  setState: Dispatch<SetStateAction<HoldToActionState>>
  onStop: () => void
  onStart: (event: HoldToActionEvents) => void
  onReset: () => void
  disableKeepInitialContent: () => void
  enableKeepInitialContent: () => void
  setDuration: (duration: number) => void
}
