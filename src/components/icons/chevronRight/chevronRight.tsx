import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IChevronRightIcon } from './chevronRight.types'

const ChevronRightIcon: BaseProps<IChevronRightIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16L14 12L10 8" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ChevronRightIcon
