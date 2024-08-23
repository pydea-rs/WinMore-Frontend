import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ISphereIcon } from './sphere.type'

const SphereIcon: BaseProps<ISphereIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.0003" cy="12.0003" r="9.00375" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <path
        d="M15.3326 12C15.3326 16.732 13.841 20.5686 12.0002 20.5686C10.5856 20.5686 9.38113 18.2996 8.89893 15.1033"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66797 12.0002C8.66797 7.26824 10.1596 3.43164 12.0004 3.43164C13.4149 3.43164 14.6194 5.70059 15.1016 8.89692"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.66797C16.732 8.66797 20.5686 10.1596 20.5686 12.0004C20.5686 13.4149 18.2996 14.6194 15.1033 15.1016"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0002 15.3326C7.26824 15.3326 3.43164 13.841 3.43164 12.0002C3.43164 10.5856 5.70059 9.38113 8.89692 8.89893"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default SphereIcon
