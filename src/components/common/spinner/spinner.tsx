import { BaseProps } from '@/types/global.types'
import { Fragment } from 'react'
import { useSpinner } from './spinner.hook'
import { SpinnerProps } from './spinner.types'

export const Spinner: BaseProps<SpinnerProps> = (props) => {
  const { children } = props

  const baseClass = 'spinner'
  const mergedAttrs = useSpinner(baseClass, props)

  return (
    <div role="status" {...mergedAttrs}>
      <span className="visually-hidden">{children ? children : <Fragment>please wait...</Fragment>}</span>
    </div>
  )
}
