import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { IMenuListHook } from './menuList.types'

export const useMenuListHook = (baseClass: string, props: IMenuListHook) => {
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
