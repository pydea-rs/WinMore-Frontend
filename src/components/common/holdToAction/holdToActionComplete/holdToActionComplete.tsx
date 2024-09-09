import { BaseProps } from '@/types/global.types'
import { useHoldToAction } from '../holdToActionProvider.hook'

export const HoldToActionComplete: BaseProps = ({ children }) => {
  const { state } = useHoldToAction?.()

  return !state.keepInitialContent && state.progress === 100 ? children : null
}
