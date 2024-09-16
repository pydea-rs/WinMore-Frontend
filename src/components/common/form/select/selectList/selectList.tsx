import { BaseProps } from '@/types/global.types'
import { ListboxOptions } from '@headlessui/react'
import { useSelectListHook } from './selectList.hook'
import { SelectListProps } from './selectList.types'

const SelectList: BaseProps<SelectListProps> = (props) => {
  const { children } = props

  // Base class for styling
  const baseClass = 'select-list'
  const mergedAttrs = useSelectListHook(baseClass, props)

  return (
    <ListboxOptions anchor="bottom" transition {...mergedAttrs}>
      {children}
    </ListboxOptions>
  )
}

export default SelectList
