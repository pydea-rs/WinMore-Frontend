import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { CardTitleHook } from './card-title.types'

export const useCardTitleHook = (baseClass: string, cartProps: CardTitleHook) => {
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
