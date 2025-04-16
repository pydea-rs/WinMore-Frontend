import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const FinanceIcon: BaseProps<ElementProps> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.96973 8.17335C6.7192 4.95833 10.4268 3.33982 13.9739 4.2427C17.521 5.14558 20.0035 8.33975 20.003 11.9999"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.0002 9.54529V8.99907" stroke="currentColor" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.0002 14.4561V15.0013" stroke="currentColor" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.5781 13.8707C10.7884 14.2312 11.1732 14.4541 11.5905 14.457H12.4909C13.0704 14.4557 13.5584 14.0233 13.6293 13.4481C13.7002 12.873 13.3319 12.335 12.77 12.193L11.2354 11.8079C10.6722 11.6677 10.3021 11.1293 10.3729 10.5533C10.4437 9.97727 10.9331 9.54458 11.5135 9.54492H12.4139C12.8299 9.54765 13.2137 9.76975 13.4233 10.1292"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99707 12C3.99651 15.6602 6.47909 18.8544 10.0262 19.7572C13.5733 20.6601 17.2809 19.0416 19.0303 15.8266"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.04526 8.1737H4.50879V4.63623" stroke="currentColor" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.9551 15.8267H19.4916V19.3641" stroke="currentColor" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export default FinanceIcon
