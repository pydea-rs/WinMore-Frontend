import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { CardHeaderHook } from './card-header.types'

export const useCardHeaderHook = (baseClass: string, cartProps: CardHeaderHook) => {
  const { className, ...restAttrs } = cartProps

  const classes = classNames({
    [baseClass]: baseClass,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
