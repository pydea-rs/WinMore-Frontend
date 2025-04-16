import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const ReferralCodeIcon: BaseProps<ElementProps> = ({ className }) => {
  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.0033 13.6281V5.49776C18.0033 3.28784 16.2116 1.49609 14.0016 1.49609H4.99788C2.78796 1.49609 0.996216 3.28784 0.996216 5.49776V14.5015C0.996216 16.7114 2.78796 18.5032 4.99788 18.5032H13.1283"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.7573 6.18296C11.6366 7.06233 11.6366 8.48692 10.7573 9.36629C9.87791 10.2457 8.45332 10.2457 7.57395 9.36629C6.69459 8.48692 6.69459 7.06233 7.57395 6.18296C8.45332 5.3036 9.87791 5.3036 10.7573 6.18296"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0008 12.9704C11.5907 12.7463 11.1235 12.6133 10.6223 12.6133H7.70905C6.46354 12.6133 5.4121 13.4006 4.99792 14.5011"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M18.2534 17.5666H15.7523" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17.0029 16.3164V18.8174" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M17.0029 13.502C19.2128 13.502 21.0046 15.2937 21.0046 17.5036C21.0046 19.7135 19.2128 21.5053 17.0029 21.5053C14.793 21.5053 13.0012 19.7135 13.0012 17.5036C13.0012 15.2937 14.793 13.502 17.0029 13.502"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default ReferralCodeIcon
