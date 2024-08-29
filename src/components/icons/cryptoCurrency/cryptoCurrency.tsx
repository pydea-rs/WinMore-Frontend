import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ICryptoCurrencyIcon } from './cryptoCurrency.types'

const CryptoCurrencyIcon: BaseProps<ICryptoCurrencyIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.0036 9.49896V6.49771C21.0036 5.11642 19.8838 3.99667 18.5026 3.99667H5.49714C4.11585 3.99667 2.99609 5.11642 2.99609 6.49771V9.99917"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M21.0042 14.501V17.5023C21.0042 18.8836 19.8844 20.0033 18.5031 20.0033H11"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.9963 20.0033V14.0008" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.05783 13.0004V14.0008" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.05783 20.0033V21.0038" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.99609 17.0021H6.49755C7.32632 17.0021 7.99818 17.6739 7.99818 18.5027V18.5027C7.99818 19.3315 7.32632 20.0033 6.49755 20.0033H2.99609V17.0021Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.99609 14.0008H6.14741C6.97618 14.0008 7.64803 14.6727 7.64803 15.5015V15.5015C7.64803 16.3302 6.97618 17.0021 6.14741 17.0021H2.99609V14.0008Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.503 9.49896H21.004C21.5566 9.49896 22.0045 9.94686 22.0045 10.4994V13.5006C22.0045 14.0531 21.5566 14.501 21.004 14.501H18.503C17.1217 14.501 16.002 13.3813 16.002 12V12C16.002 10.6187 17.1217 9.49896 18.503 9.49896V9.49896Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path d="M7.99805 8.99875H13.0001" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default CryptoCurrencyIcon
