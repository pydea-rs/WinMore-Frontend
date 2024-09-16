import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { SelectListHook } from './selectList.types'

export const useSelectListHook = (baseClass: string, props: SelectListHook) => {
  const { className, ...restAttrs } = props

  const classes = classNames({
    [baseClass]: baseClass,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
