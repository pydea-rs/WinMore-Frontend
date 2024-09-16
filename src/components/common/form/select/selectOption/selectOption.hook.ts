import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { SelectOptionHook } from './selectOption.types'

export const useSelectOptionHook = (baseClass: string, props: SelectOptionHook) => {
  const { className, ...restAttrs } = props

  const classes = classNames({
    ['group']: true,
    [baseClass]: baseClass,
    [className]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
