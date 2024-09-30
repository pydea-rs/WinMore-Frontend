import { useEnhancedProps } from '@/hooks/useBaseComponent'
import { DropdownHook } from './dropdown.types'

export const useDropdownHook = (baseClass: string, props: DropdownHook) => {
  const { ...restAttrs } = props

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
  })

  return mergedAttrs
}
