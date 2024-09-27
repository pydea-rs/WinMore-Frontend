import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { IMenuHook } from './menu.types'

export const useMenuHook = (baseClass: string, props: IMenuHook) => {
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
