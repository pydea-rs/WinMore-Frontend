import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ISingleUserIcon } from './singleUser.type'

const SingleUserIcon: BaseProps<ISingleUserIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5 20V19.25C20.5 16.9028 18.5972 15 16.25 15H8.75C6.40279 15 4.5 16.9028 4.5 19.25V20"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12.5" cy="7" r="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default SingleUserIcon
