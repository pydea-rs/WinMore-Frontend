import { BaseProps } from '@/types/global.types'
import { ListboxOption } from '@headlessui/react'
import { useSelectOptionHook } from './selectOption.hook'
import { SelectOptionProps } from './selectOption.types'

const SelectOption: BaseProps<SelectOptionProps> = (props) => {
  const { children } = props

  // Base class for styling
  const baseClass = 'select-option'
  const mergedAttrs = useSelectOptionHook(baseClass, props)

  return (
    <ListboxOption value={props.value} {...mergedAttrs}>
      {children}
    </ListboxOption>
  )
}

export default SelectOption
