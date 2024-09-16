import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { SelectHook } from './select.types'

export const useSelectHook = (baseClass: string, props: SelectHook) => {
  const { ...restAttrs } = props

  const classes = classNames({
    [baseClass]: baseClass,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
