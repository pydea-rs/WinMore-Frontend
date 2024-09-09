import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { RadioCardHook } from './radioCard.types'

export const useRadioHook = (baseClass: string, checkoutProps: RadioCardHook) => {
  const { className, disabled, ...restAttrs } = checkoutProps

  const classes = classNames({
    [baseClass]: baseClass,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...{ ...restAttrs, disabled },
    className: classes,
  })

  return mergedAttrs
}
