import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { RadioCardGroupHook } from './radioCardGroup.types'

export const useRadioCardGroupHook = (baseClass: string, formGroupProps: RadioCardGroupHook) => {
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
