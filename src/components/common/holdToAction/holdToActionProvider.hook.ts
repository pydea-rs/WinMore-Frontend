import { useContext } from 'react'
import { HoldToActionContext } from './holdToActionProvider'

export const useHoldToAction = () => {
  const context = useContext(HoldToActionContext)

  if (!context) {
    throw new Error('useHoldToAction must be used within a HoldToActionProvider')
  }

  return context
}
