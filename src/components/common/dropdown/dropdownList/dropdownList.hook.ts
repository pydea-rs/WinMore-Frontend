import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { DropdownListHook } from './dropdownList.types'

export const useDropdownListHook = (baseClass: string, props: DropdownListHook) => {
  const { className, ...restAttrs } = props

  const classList = classNames({
    [baseClass]: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classList,
  })

  return mergedAttrs
}
