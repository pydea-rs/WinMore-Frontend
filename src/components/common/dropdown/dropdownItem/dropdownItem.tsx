import { BaseProps } from '@/types/global.types'
import { useDropdownItemHook } from './dropdownItem.hook'
import { DropdownItemProps } from './dropdownItem.types'

const DropdownItem: BaseProps<DropdownItemProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown-item'
  const mergedAttrs = useDropdownItemHook(baseClass, props)

  return <button {...mergedAttrs}>{children}</button>
}

export default DropdownItem
