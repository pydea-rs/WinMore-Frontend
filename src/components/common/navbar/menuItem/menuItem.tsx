import { BaseProps } from '@/types/global.types'

import { useMenuItemHook } from './menuItem.hook'
import { IMenuItem } from './menuItem.types'

const MenuItem: BaseProps<IMenuItem> = (props) => {
  const { children } = props

  const baseClass = 'menu-item'
  const mergedAttrs = useMenuItemHook(baseClass, props)

  return <li {...mergedAttrs}>{children}</li>
}

export default MenuItem
