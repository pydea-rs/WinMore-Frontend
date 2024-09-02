import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IHomeIcon } from './home.types'

const HomeIcon: BaseProps<IHomeIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.195 7.98621L14.435 3.50589C13.3953 2.69661 11.939 2.69661 10.8984 3.50589L5.13835 7.98621C4.43659 8.53245 4.02667 9.37149 4.02667 10.2595V17.2992C4.02667 18.8899 5.31595 20.1792 6.90667 20.1792H18.4267C20.0174 20.1792 21.3067 18.8899 21.3067 17.2992V10.2595C21.3067 9.37149 20.8968 8.53245 20.195 7.98621Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
      />
    </svg>
  )
}
export default HomeIcon
