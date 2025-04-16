import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const LogoutIcon: BaseProps<ElementProps> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9994 19.0005C11.9992 19.7277 11.6044 20.3976 10.9682 20.75C10.3321 21.1024 9.55477 21.0818 8.93815 20.6962L4.93649 18.1952C4.35124 17.8298 3.99577 17.1884 3.99609 16.4984V5.00008C3.99619 4.27277 4.39092 3.60278 5.02706 3.2502C5.6632 2.89762 6.44056 2.91798 7.05737 3.30337L11.059 5.80441C11.6443 6.16982 11.9997 6.81117 11.9994 7.50112V19.0005Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20.0031 9.54198L17.0879 12.4572" stroke="currentColor" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.0031 12.4572L17.0879 9.54198" stroke="currentColor" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.0015 5.9975V4.99708C19.0017 4.46638 18.7909 3.95738 18.4156 3.58212C18.0404 3.20686 17.5314 2.9961 17.0007 2.99625H5.99609"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19.0029H17.0021C17.5328 19.0031 18.0418 18.7923 18.417 18.417C18.7923 18.0418 19.0031 17.5328 19.0029 17.0021V16.0017"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default LogoutIcon
