import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { CardHook, CardSizes } from './card.types'

export const useCardHook = (baseClass: string, cartProps: CardHook) => {
  const { className, size, responsive, ...restAttrs } = cartProps

  const getSize = (size?: CardSizes): null | CardSizes => {
    switch (size) {
      case 'md': {
        return null // default value
      }

      case 'lg': {
        return 'lg'
      }

      default: {
        return null
      }
    }
  }

  const classes = classNames({
    [baseClass]: baseClass,
    [`${baseClass}-${getSize(size)}`]: getSize(size),
    [`${baseClass}-responsive`]: responsive,
    [`${className}`]: className,
  })

  const mergedAttrs = useMergeAttrs({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
