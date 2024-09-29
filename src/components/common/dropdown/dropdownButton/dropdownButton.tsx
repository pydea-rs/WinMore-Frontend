import { BaseProps } from '@/types/global.types'
import { MenuButton } from '@headlessui/react'
import { useDropdownButtonHook } from './dropdownButton.hook'
import { DropdownButtonProps } from './dropdownButton.types'

const DropdownButton: BaseProps<DropdownButtonProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown-button'
  const mergedAttrs = useDropdownButtonHook(baseClass, props)

  return <MenuButton {...mergedAttrs}>{children}</MenuButton>
}

export default DropdownButton
