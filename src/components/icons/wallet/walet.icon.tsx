import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IWalletIcon } from './wallet.types'

const WalletIcon: BaseProps<IWalletIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.039 7.91522H19C20.105 7.91522 21 8.81022 21 9.91522V19.0002C21 20.1002 20.1 21.0002 19 21.0002H5C3.895 21.0002 3 20.1052 3 19.0002V8.29122C3 7.45922 3.515 6.71422 4.294 6.42022L14.647 2.51122C15.301 2.26422 16 2.74722 16 3.44622V7.91422"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.999 14.125C15.792 14.126 15.625 14.294 15.625 14.501C15.625 14.708 15.793 14.876 16 14.875C16.207 14.875 16.375 14.707 16.375 14.5C16.375 14.293 16.207 14.125 15.999 14.125"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default WalletIcon
