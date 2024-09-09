import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { HoldToActionButtonHook } from './holdToActionButton.types'

export const useHoldToActionButton = (baseClass: string, props: HoldToActionButtonHook) => {
  const { className, ...restProps } = props

  const classes = classNames(baseClass, className)

  return useEnhancedProps({
    ...restProps,
    className: classes,
  })
}
