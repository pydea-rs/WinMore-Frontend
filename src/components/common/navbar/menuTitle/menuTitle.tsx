import { BaseProps } from '@/types/global.types'
import { useMenuTitleHook } from './menuTitle.hook'
import { IMenuTitle } from './menuTitle.types'

const MenuTitle: BaseProps<IMenuTitle> = (props) => {
  const { children } = props

  const baseClass = 'menu-title'
  const mergedAttrs = useMenuTitleHook(baseClass, props)

  return <h3 {...mergedAttrs}>{children}</h3>
}

export default MenuTitle
