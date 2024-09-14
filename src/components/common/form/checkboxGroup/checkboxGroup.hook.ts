import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { CheckboxGroupHook } from './checkboxGroup.types'

export const useCheckboxGroupHook = (baseClass: string, formGroupProps: CheckboxGroupHook) => {
  const { className, ...restAttrs } = formGroupProps

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
