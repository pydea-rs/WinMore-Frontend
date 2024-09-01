import { BaseProps } from '@/types/global.types'
import { useCardBodyHook } from './card-body.hook'
import { CardBodyProps } from './card-body.types'

export const CardBody: BaseProps<CardBodyProps> = (props) => {
  const { children } = props
  const baseClass = 'card-body'
  const mergedAttrs = useCardBodyHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
