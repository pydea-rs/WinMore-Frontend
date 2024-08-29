import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IMoneyIcon } from './money.types'

const MoneyIcon: BaseProps<IMoneyIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9.04986" cy="10.3121" rx="6.0025" ry="2.50104" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
      <path
        d="M15.0524 13.8135C15.0524 15.1948 12.365 16.3145 9.04986 16.3145C5.73477 16.3145 3.04736 15.1948 3.04736 13.8135"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M21.0547 10.312C21.0547 11.6933 18.3673 12.8131 15.0522 12.8131"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M15.0524 10.312V17.8151C15.0524 19.1964 12.365 20.3162 9.04986 20.3162C5.73477 20.3162 3.04736 19.1964 3.04736 17.8151V10.312"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M21.0547 6.81055V14.3137C21.0547 15.695 18.3673 16.8147 15.0522 16.8147"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M9.55001 7.82103C9.25302 7.5661 9.07246 7.20136 9.0498 6.81061C9.0498 5.43004 11.7409 4.30957 15.0523 4.30957C18.3637 4.30957 21.0548 5.43004 21.0548 6.81061C21.0548 8.19119 18.3637 9.31165 15.0523 9.31165C14.8822 9.31165 14.7122 9.31165 14.5521 9.30165"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
    </svg>
  )
}

export default MoneyIcon
