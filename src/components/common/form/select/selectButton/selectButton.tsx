import { BaseProps } from '@/types/global.types'
import { ListboxButton } from '@headlessui/react'
import { useSelectButtonHook } from './selectButton.hook'
import { SelectButtonProps } from './selectButton.types'

export const SelectButton: BaseProps<SelectButtonProps> = (props) => {
  const { children } = props

  // Base class for styling
  const baseClass = 'select-button'
  const mergedAttrs = useSelectButtonHook(baseClass, props)

  return <ListboxButton {...mergedAttrs}>{children}</ListboxButton>
}

export default SelectButton
