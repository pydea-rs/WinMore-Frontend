import { BaseProps } from '@/types/global.types'
import { useCardTitleHook } from './card-title.hook'
import { CardTitleProps } from './card-title.types'

export const CardTitle: BaseProps<CardTitleProps> = (props) => {
  const { children, selected = true, asElement = false } = props
  const baseClass = 'card-title'
  const mergedAttrs = useCardTitleHook(baseClass, props)

  return <div {...mergedAttrs}>{!asElement ? <h3 className={selected ? 'selected' : 'unselected'}>{children}</h3> : children}</div>
}
