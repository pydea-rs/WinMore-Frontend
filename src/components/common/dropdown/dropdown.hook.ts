import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { DropdownHook } from './dropdown.types'

export const useDropdownHook = (baseClass: string, props: DropdownHook) => {
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
