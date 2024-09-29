import { BaseProps } from '@/types/global.types'
import { MenuItems } from '@headlessui/react'
import { useDropdownListHook } from './dropdownList.hook'
import { DropdownListProps } from './dropdownList.types'

const DropdownList: BaseProps<DropdownListProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown-list'
  const mergedAttrs = useDropdownListHook(baseClass, props)

  return (
    <MenuItems transition anchor="bottom end" {...mergedAttrs}>
      {children}
    </MenuItems>
  )
}

export default DropdownList
