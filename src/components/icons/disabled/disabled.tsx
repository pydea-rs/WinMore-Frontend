import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDisabledIcon } from './disabled.types'

const DisabledIcon: BaseProps<IDisabledIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8.5L16 16.5" stroke="currentColor" fill="transition" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8.5L8 16.5" stroke="currentColor" fill="transition" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default DisabledIcon
