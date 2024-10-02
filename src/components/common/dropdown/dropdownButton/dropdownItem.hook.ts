import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { DropdownButtonHook } from './dropdownItem.types'

export const useDropdownButtonHook = (baseClass: string, props: DropdownButtonHook) => {
  const { className, ...restAttrs } = props

  const classList = classNames({
    [baseClass]: true,
    ['group']: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classList,
  })

  return mergedAttrs
}
