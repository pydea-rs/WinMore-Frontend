import { BaseProps } from '@/types/global.types'
import { useMenuListHook } from './menuList.hook'
import { IMenuList } from './menuList.types'

const MenuList: BaseProps<IMenuList> = (props) => {
  const { children } = props

  const baseClass = 'menu-list'
  const mergedAttrs = useMenuListHook(baseClass, props)

  return <ul {...mergedAttrs}>{children}</ul>
}

export default MenuList
