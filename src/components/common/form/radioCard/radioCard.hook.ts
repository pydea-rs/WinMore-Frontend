import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { RadioCardHook } from './radioCard.types'

export const useRadioHook = (baseClass: string, checkoutProps: RadioCardHook) => {
  const { className, disabled, ...restAttrs } = checkoutProps

  const classes = classNames({
    [baseClass]: baseClass,
    [`${className}`]: className,
  })

  const mergedAttrs = useMergeAttrs({
    ...{ ...restAttrs, disabled },
    className: classes,
  })

  return mergedAttrs
}
