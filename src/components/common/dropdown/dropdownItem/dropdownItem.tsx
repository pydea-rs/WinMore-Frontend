import { BaseProps } from '@/types/global.types'
import { MenuItem } from '@headlessui/react'
import { useDropdownItemHook } from './dropdownItem.hook'
import { DropdownItemProps } from './dropdownItem.types'

const DropdownItem: BaseProps<DropdownItemProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown-item'
  const mergedAttrs = useDropdownItemHook(baseClass, props)

  return <MenuItem>{children}</MenuItem>
}

export default DropdownItem
