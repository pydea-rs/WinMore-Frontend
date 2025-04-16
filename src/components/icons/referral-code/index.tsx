import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const ReferralCodeIcon: BaseProps<ElementProps> = ({ className }) => {
  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.59 13.41L10.59 3.41003C10.21 3.03003 9.7 2.83003 9.17 2.83003H4C2.9 2.83003 2 3.73003 2 4.83003V10C2 10.53 2.21 11.04 2.59 11.41L12.59 21.41C13.37 22.19 14.63 22.19 15.41 21.41L20.59 16.24C21.37 15.46 21.37 14.2 20.59 13.41Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.33003" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default ReferralCodeIcon
