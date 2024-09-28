import { BaseProps } from '@/types/global.types'
import { useMenuHook } from './menu.hook'
import { IMenu } from './menu.types'

const Menu: BaseProps<IMenu> = (props) => {
  const { children } = props

  const baseClass = 'menu'
  const mergedAttrs = useMenuHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}

export default Menu
