import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const ProfileIcon: BaseProps<ElementProps> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.2334 20C7.8334 18.5 9.9334 17.5 12.3334 17.5C14.6334 17.5 16.8334 18.4 18.4334 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transition"
      />
      <path
        d="M14.4334 9.40002C15.6334 10.6 15.6334 12.5 14.4334 13.6C13.2334 14.7 11.3334 14.8 10.2334 13.6C9.13339 12.4 9.03339 10.5 10.2334 9.40002C11.4334 8.30002 13.2334 8.20002 14.4334 9.40002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transition"
      />
      <path
        d="M4.33337 17C3.73337 15.8 3.33337 14.4 3.33337 13C3.33337 8 7.33337 4 12.3334 4C17.3334 4 21.3334 8 21.3334 13C21.3334 14.4 20.9334 15.8 20.3334 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transition"
      />
    </svg>
  )
}
export default ProfileIcon
