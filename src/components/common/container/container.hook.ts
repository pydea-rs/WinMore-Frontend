import { useMergeAttrs } from '@/hooks/useBaseComponent'
import classNames from 'classnames'
import { ContainerHook, ContainerKinds } from './container.types'

export const useContainer = (baseClass: string, props: ContainerHook) => {
  const { kind, className, ...restAttrs } = props

  const getKind = (kind?: ContainerKinds): ContainerKinds => {
    switch (kind) {
      case 'boxed': {
        return 'boxed'
      }
      case 'fluid': {
        return 'fluid'
      }
      default: {
        return 'boxed'
      }
    }
  }

  const classes = classNames({
    [`${baseClass}-${getKind(kind)}`]: true,
    [`${className}`]: className,
  })

  const mergedAttrs = useMergeAttrs({
    ...restAttrs,
    className: classes,
  })

  return mergedAttrs
}
