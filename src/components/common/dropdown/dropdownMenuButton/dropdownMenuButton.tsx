import { BaseProps } from '@/types/global.types'
import { MenuButton } from '@headlessui/react'
import { useDropdownButtonHook } from './dropdownMenuButton.hook'
import { DropdownMenuButtonProps } from './dropdownMenuButton.types'

const DropdownMenuButton: BaseProps<DropdownMenuButtonProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown-menu-button'
  const mergedAttrs = useDropdownButtonHook(baseClass, props)

  return <MenuButton {...mergedAttrs}>{children}</MenuButton>
}

export default DropdownMenuButton
