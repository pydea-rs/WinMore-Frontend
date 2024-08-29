import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { LabelHook } from './label.types'

export const useLabelHook = (baseClass: string, labelProps: LabelHook) => {
  const { className, ...restAttrs } = labelProps

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
