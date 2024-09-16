import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { SelectIconHook } from './selectIcon.types'

export const useSelectIconHook = (baseClass: string, props: SelectIconHook) => {
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
