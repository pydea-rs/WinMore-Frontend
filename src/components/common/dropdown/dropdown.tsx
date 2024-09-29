import { BaseProps } from '@/types/global.types'
import { Menu } from '@headlessui/react'
import { useDropdownHook } from './dropdown.hook'
import { DropdownProps } from './dropdown.types'

const Dropdown: BaseProps<DropdownProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown'
  const mergedAttrs = useDropdownHook(baseClass, props)

  return (
    <Menu as={'div'} {...mergedAttrs}>
      {children}
    </Menu>
  )
}

export default Dropdown
