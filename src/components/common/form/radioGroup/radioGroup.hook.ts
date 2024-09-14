import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { RadioGroupHook } from './radioGroup.types'

export const useRadioGroupHook = (baseClass: string, formGroupProps: RadioGroupHook) => {
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
