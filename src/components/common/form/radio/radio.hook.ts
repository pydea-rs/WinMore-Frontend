import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { RadioHook } from './radio.types'

export const useRadioHook = (baseClass: string, checkoutProps: RadioHook) => {
  const { className, size, disabled, ...restAttrs } = checkoutProps

  const classes = classNames({
    [baseClass]: baseClass,
    'form-radio-sm': size === 'sm',
    [`${className}`]: className,
  })

  const mergedAttrs = useMergeAttrs({
    ...{ ...restAttrs, disabled },
    className: classes,
  })

  return mergedAttrs
}
