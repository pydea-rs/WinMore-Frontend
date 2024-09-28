import { BaseProps } from '@/types/global.types'
import { useAlertHook } from './alert.hook'
import { AlertProps } from './alert.types'

export const Alert: BaseProps<AlertProps> = (props) => {
  const { children } = props

  // Base class for styling
  const baseClass = 'alert'
  const mergedAttrs = useAlertHook(baseClass, props)
  return <div {...mergedAttrs}>{children}</div>
}
