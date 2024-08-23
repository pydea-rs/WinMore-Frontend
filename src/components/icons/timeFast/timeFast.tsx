import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITimeFastIcon } from './timeFast.type'

const TimeFastIcon: BaseProps<ITimeFastIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="transparent" d="M7.9983 21.5037H2.99622" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M4.99707 18.5025H7.99832" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M11.7859 9.46472V12.9822L14.551 14.6689" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 21.5037C16.9726 21.5037 21.0037 17.4726 21.0037 12.5C21.0037 7.52736 16.9726 3.49625 12 3.49625C7.02733 3.49625 2.99622 7.52736 2.99622 12.5C2.99891 13.1739 3.07888 13.8452 3.23454 14.5008"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default TimeFastIcon
