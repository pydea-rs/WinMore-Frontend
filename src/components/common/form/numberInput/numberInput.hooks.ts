import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { NumberInputHook } from './numberInput.types'

export const useNumberInputHook = (baseClass: string, inputProps: NumberInputHook) => {
  const { className, autoFocus, disabled, invalid, valid, value, ...restAttrs } = inputProps

  const classes = classNames({
    [baseClass]: baseClass,
    'border-main': autoFocus,
    'border-danger bg-danger/[0.04]': invalid,
    'border-primary bg-primary/[0.04]': valid,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...{ ...restAttrs, autoFocus, disabled },
    value,
    className: classes,
  })

  return mergedAttrs
}
