import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { IMenuTitleHook } from './menuTitle.types'

export const useMenuTitleHook = (baseClass: string, props: IMenuTitleHook) => {
  const { className, ...restAttrs } = props

  const classTitle = classNames({
    [baseClass]: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classTitle,
  })

  return mergedAttrs
}
