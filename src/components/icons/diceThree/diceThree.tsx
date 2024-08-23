import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDiceThreeIcon } from './diceThree.type'

const DiceThreeIcon: BaseProps<IDiceThreeIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0024 2.99625H6.99825C4.79087 3.00271 3.00304 4.79054 2.99658 6.99792V17.0021C3.00304 19.2095 4.79087 20.9973 6.99825 21.0038H17.0024C19.2098 20.9973 20.9976 19.2095 21.0041 17.0021V6.99792C20.9976 4.79054 19.2098 3.00271 17.0024 2.99625Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5004 12C12.5004 12.2763 12.2765 12.5002 12.0002 12.5002C11.724 12.5002 11.5 12.2763 11.5 12C11.5 11.7237 11.724 11.4998 12.0002 11.4998"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.0001 11.4998C12.2764 11.4998 12.5003 11.7237 12.5003 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.6835 8.81667C15.6835 9.09293 15.4596 9.31688 15.1833 9.31688C14.9071 9.31688 14.6831 9.09293 14.6831 8.81667C14.6831 8.54042 14.9071 8.31647 15.1833 8.31647"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.1837 8.31647C15.46 8.31647 15.6839 8.54042 15.6839 8.81667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.31731 15.1833C9.31731 15.4596 9.09336 15.6835 8.8171 15.6835C8.54085 15.6835 8.31689 15.4596 8.31689 15.1833C8.31689 14.9071 8.54085 14.6831 8.8171 14.6831"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.817 14.6831C9.09326 14.6831 9.31721 14.9071 9.31721 15.1833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default DiceThreeIcon
