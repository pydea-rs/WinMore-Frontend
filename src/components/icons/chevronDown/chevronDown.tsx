import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IChevronDownIcon } from './chevronDown.types'

const ChevronDownIcon: BaseProps<IChevronDownIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.55078 10.3128L12.5508 14.3128L16.5508 10.3128" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
    </svg>
  )
}

export default ChevronDownIcon
