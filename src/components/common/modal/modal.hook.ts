import { useEnhancedProps } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { ModalHook } from './modal.types'

export const useModalHook = (baseClass: string, props: ModalHook) => {
  const { className, ...restAttrs } = props

  const classList = classNames({
    [baseClass]: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useEnhancedProps({
    ...restAttrs,
    className: classList,
  })

  return mergedAttrs
}
