import { BaseProps } from '@/types/global.types'
import { useCardHeaderHook } from './card-header.hook'
import { CardHeaderProps } from './card-header.types'

export const CardHeader: BaseProps<CardHeaderProps> = (props) => {
  const { children } = props
  const baseClass = 'card-header'
  const mergedAttrs = useCardHeaderHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
