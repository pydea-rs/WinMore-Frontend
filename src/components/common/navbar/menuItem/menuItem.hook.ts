import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { IMenuItemHook } from './menuItem.types'

export const useMenuItemHook = (baseClass: string, props: IMenuItemHook) => {
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
