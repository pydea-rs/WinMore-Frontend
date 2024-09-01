import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { CardTitleHook } from './card-title.types'

export const useCardTitleHook = (baseClass: string, cartProps: CardTitleHook) => {
  const { className, ...restAttrs } = cartProps

  const classes = classNames({
    [baseClass]: baseClass,
    [`${className}`]: className,
  })

  const mergedAttrs = useMergeAttrs({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
