import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ICentIcon } from './cent.types'

const CentIcon: BaseProps<ICentIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.1666 22C6.57763 22 3.66663 19.09 3.66663 15.5C3.66663 11.91 6.57763 9 10.1666 9C13.7566 9 16.6666 11.91 16.6666 15.5C16.6666 19.09 13.7566 22 10.1666 22Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M10.1666 22C6.57763 22 3.66663 19.09 3.66663 15.5C3.66663 11.91 6.57763 9 10.1666 9C13.7566 9 16.6666 11.91 16.6666 15.5C16.6666 19.09 13.7566 22 10.1666 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <path d="M9.08362 14.417L10.1666 13.333V17.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.08667 17.67H11.2467" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> */}
      <path
        d="M8.81067 9.144C9.43467 6.206 12.0427 4 15.1667 4C18.7567 4 21.6667 6.91 21.6667 10.5C21.6667 13.625 19.4617 16.232 16.5227 16.856"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CentIcon
