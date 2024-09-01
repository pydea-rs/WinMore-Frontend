import { BaseProps } from '@/types/global.types'
import { useCardTitleHook } from './card-title.hook'
import { CardTitleProps } from './card-title.types'

export const CardTitle: BaseProps<CardTitleProps> = (props) => {
  const { children } = props
  const baseClass = 'card-title'
  const mergedAttrs = useCardTitleHook(baseClass, props)

  return (
    <div {...mergedAttrs}>
      <h3>{children}</h3>
    </div>
  )
}
