import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { DropdownItemHook } from './dropdownItem.types'

export const useDropdownItemHook = (baseClass: string, props: DropdownItemHook) => {
  const { className, ...restAttrs } = props

  const classList = classNames({
    [baseClass]: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    // className: classList,
  })

  return mergedAttrs
}
