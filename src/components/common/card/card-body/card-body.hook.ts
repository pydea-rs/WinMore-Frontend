import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { CardBodyHook } from './card-body.types'

export const useCardBodyHook = (baseClass: string, cartProps: CardBodyHook) => {
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
