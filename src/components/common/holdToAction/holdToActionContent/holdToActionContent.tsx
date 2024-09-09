import { BaseProps } from '@/types/global.types'
import { useHoldToAction } from '../holdToActionProvider.hook'

export const HoldToActionContent: BaseProps = ({ children }) => {
  const { state } = useHoldToAction()

  return <div className={`relative z-10 ${state.keepInitialContent ? 'opacity-100' : state.progress === 100 ? 'opacity-0' : 'opacity-100'}`}>{children}</div>
}
