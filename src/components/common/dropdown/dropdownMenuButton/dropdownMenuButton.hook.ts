import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { DropdownMenuButtonHook } from './dropdownMenuButton.types'

export const useDropdownButtonHook = (baseClass: string, props: DropdownMenuButtonHook) => {
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
