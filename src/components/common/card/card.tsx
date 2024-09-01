import { BaseProps } from '@/types/global.types'
import { useCardHook } from './card.hook'
import { CardProps } from './card.types'

export const Card: BaseProps<CardProps> = (props) => {
  const { children } = props
  const baseClass = 'card'
  const mergedAttrs = useCardHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
