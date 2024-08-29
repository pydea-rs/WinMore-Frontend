import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IEmailIcon } from './email.types'

const EmailIcon: BaseProps<IEmailIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.7458 10.5665L19.8868 9.79349C20.5878 9.31849 21.0078 8.52649 21.0078 7.67949V7.67949C21.0078 6.26949 19.8648 5.12549 18.4538 5.12549H5.56084C4.15084 5.12549 3.00684 6.26849 3.00684 7.67949V7.67949C3.00684 8.52649 3.42684 9.31849 4.12784 9.79349L5.26884 10.5665C9.33784 13.3245 14.6768 13.3245 18.7458 10.5665V10.5665Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 7.67944V17.1254C3 18.7824 4.343 20.1254 6 20.1254H18C19.657 20.1254 21 18.7824 21 17.1254V7.67944"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default EmailIcon
