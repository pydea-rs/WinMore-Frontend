import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const Casino: BaseProps<ElementProps> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.7175 5.28249C22.4275 8.99247 22.4275 15.0075 18.7175 18.7175C15.0075 22.4275 8.99243 22.4275 5.28249 18.7175C1.5725 15.0075 1.5725 8.99243 5.28249 5.28249C8.99247 1.5725 15.0075 1.5725 18.7175 5.28249"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M18.7175 5.28249C22.4275 8.99247 22.4275 15.0075 18.7175 18.7175C15.0075 22.4275 8.99243 22.4275 5.28249 18.7175C1.5725 15.0075 1.5725 8.99243 5.28249 5.28249C8.99247 1.5725 15.0075 1.5725 18.7175 5.28249"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M16.2426 7.75736C18.5858 10.1005 18.5858 13.8995 16.2426 16.2426C13.8995 18.5858 10.1005 18.5858 7.75736 16.2426C5.41421 13.8995 5.41421 10.1005 7.75736 7.75736C10.1005 5.41421 13.8995 5.41421 16.2426 7.75736"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M16.2426 7.75736C18.5858 10.1005 18.5858 13.8995 16.2426 16.2426C13.8995 18.5858 10.1005 18.5858 7.75736 16.2426C5.41421 13.8995 5.41421 10.1005 7.75736 7.75736C10.1005 5.41421 13.8995 5.41421 16.2426 7.75736"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path fill="transparent" d="M7.75 3.51001L9.32 6.64001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M14.6801 17.36L16.2501 20.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M14.6801 6.64001L16.2501 3.51001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M9.32 17.36L7.75 20.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M20.49 7.75L17.36 9.32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M6.64001 14.68L3.51001 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M20.49 16.25L17.36 14.68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="transparent" d="M6.64001 9.32L3.51001 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        fill="transparent"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 15L14.75 12L12 9L9.25 12L12 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Casino
