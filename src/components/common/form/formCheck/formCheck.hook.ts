import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { FromCheckHook } from './formCheck.types'

export const useFormCheckHook = (baseClass: string, formGroupProps: FromCheckHook) => {
  const { className, ...restAttrs } = formGroupProps

  const classes = classNames({
    [baseClass]: baseClass,
    'w-full': true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
