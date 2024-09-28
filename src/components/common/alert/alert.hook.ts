import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { AlertHook, AlertType } from './alert.types'

export const useAlertHook = (baseClass: string, btnProps: AlertHook) => {
  const { variant, className, ...restAttrs } = btnProps

  const getVariant = (variant?: AlertType) => {
    if (!variant) {
      return `primary`
    }
    return variant
  }

  const classes = classNames({
    [`${baseClass}-${getVariant(variant)}`]: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
