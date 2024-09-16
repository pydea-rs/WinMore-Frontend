import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { SelectButtonHook } from './selectButton.types'

export const useSelectButtonHook = (baseClass: string, props: SelectButtonHook) => {
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
