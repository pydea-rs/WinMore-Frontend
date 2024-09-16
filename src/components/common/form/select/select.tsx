import { BaseProps } from '@/types/global.types'
import { Listbox } from '@headlessui/react'
import { useSelectHook } from './select.hook'
import { SelectProps } from './select.types'

const Select: BaseProps<SelectProps> = (props) => {
  const { children } = props

  // Base class for styling
  const baseClass = 'select-form'
  const mergedAttrs = useSelectHook(baseClass, props)

  return (
    <Listbox as={'div'} {...mergedAttrs}>
      {children}
    </Listbox>
  )
}

export default Select
