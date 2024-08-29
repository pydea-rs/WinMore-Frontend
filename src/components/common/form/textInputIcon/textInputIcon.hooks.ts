import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { TextInputIconHook } from './textInputIcon.types'

export const useTextInputIconHook = (baseClass: string, inputProps: TextInputIconHook) => {
  const { className, ...restAttrs } = inputProps

  const classes = classNames({
    [baseClass]: baseClass,
    [`${className}`]: className,
  })
  const mergedAttrs = useMergeAttrs({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
