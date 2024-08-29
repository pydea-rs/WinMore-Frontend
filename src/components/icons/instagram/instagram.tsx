import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IInstagramIcon } from './instagram.types'

const InstagramIcon: BaseProps<IInstagramIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.496 3.5H16.505C18.987 3.5 21 5.512 21 7.996V17.005C21 19.487 18.988 21.5 16.504 21.5H7.496C5.013 21.5 3 19.488 3 17.004V7.996C3 5.513 5.012 3.5 7.496 3.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.949 7.21304C16.763 7.21404 16.612 7.36504 16.612 7.55104C16.612 7.73704 16.764 7.88804 16.95 7.88804C17.136 7.88804 17.287 7.73704 17.287 7.55104C17.288 7.36404 17.136 7.21304 16.949 7.21304"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5455 9.95444C15.9514 11.3603 15.9514 13.6397 14.5455 15.0456C13.1396 16.4515 10.8602 16.4515 9.45432 15.0456C8.04843 13.6397 8.04843 11.3603 9.45432 9.95444C10.8602 8.54855 13.1396 8.54855 14.5455 9.95444"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default InstagramIcon
