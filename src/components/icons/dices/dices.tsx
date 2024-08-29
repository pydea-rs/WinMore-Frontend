import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDicesIcon } from './dices.type'

const DicesIcon: BaseProps<IDicesIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.66284" y="8.99872" width="12.005" height="12.005" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.6679 15.0012H19.6696C20.7733 14.998 21.6672 14.1041 21.6704 13.0004V4.99705C21.6672 3.89336 20.7733 2.99945 19.6696 2.99622H11.6662C10.5625 2.99945 9.66864 3.89336 9.66541 4.99705V8.99872"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0002 5.99734C13.0002 6.13228 12.9189 6.25394 12.7943 6.30558C12.6696 6.35722 12.5261 6.32867 12.4307 6.23325C12.3353 6.13783 12.3067 5.99433 12.3584 5.86966C12.41 5.74498 12.5317 5.6637 12.6666 5.6637"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.6666 5.66371C12.8509 5.66371 13.0003 5.81309 13.0003 5.99735" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.0028 5.99734C19.0028 6.13228 18.9215 6.25394 18.7968 6.30558C18.6722 6.35722 18.5287 6.32867 18.4332 6.23325C18.3378 6.13783 18.3093 5.99433 18.3609 5.86966C18.4126 5.74498 18.5342 5.6637 18.6692 5.6637"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18.6691 5.66371C18.8533 5.66371 19.0027 5.81309 19.0027 5.99735" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.0028 11.9998C19.0028 12.1841 18.8534 12.3335 18.6692 12.3335C18.4849 12.3335 18.3355 12.1841 18.3355 11.9998C18.3355 11.8156 18.4849 11.6662 18.6692 11.6662"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18.6691 11.6662C18.8533 11.6662 19.0027 11.8156 19.0027 11.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M13.0002 11.9998C13.0002 12.1841 12.8509 12.3335 12.6666 12.3335C12.4823 12.3335 12.333 12.1841 12.333 11.9998C12.333 11.8156 12.4823 11.6662 12.6666 11.6662"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.6666 11.6662C12.8509 11.6662 13.0003 11.8156 13.0003 11.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.99779 11.9998C6.99779 12.1841 6.84841 12.3335 6.66415 12.3335C6.47989 12.3335 6.33051 12.1841 6.33051 11.9998C6.33051 11.8156 6.47989 11.6662 6.66415 11.6662"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.66408 11.6662C6.84834 11.6662 6.99772 11.8156 6.99772 11.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.99901 15.0011C9.99901 15.1853 9.84963 15.3347 9.66537 15.3347C9.48111 15.3347 9.33173 15.1853 9.33173 15.0011C9.33173 14.8168 9.48111 14.6674 9.66537 14.6674"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.66542 14.6674C9.75391 14.6674 9.83877 14.7026 9.90134 14.7652C9.96391 14.8277 9.99906 14.9126 9.99906 15.0011"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0002 18.0023C13.0002 18.1866 12.8509 18.336 12.6666 18.336C12.4823 18.336 12.333 18.1866 12.333 18.0023C12.333 17.8181 12.4823 17.6687 12.6666 17.6687"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.6666 17.6687C12.8509 17.6687 13.0003 17.8181 13.0003 18.0024" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.99779 18.0023C6.99779 18.1866 6.84841 18.336 6.66415 18.336C6.47989 18.336 6.33051 18.1866 6.33051 18.0023C6.33051 17.8181 6.47989 17.6687 6.66415 17.6687"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.66408 17.6687C6.84834 17.6687 6.99772 17.8181 6.99772 18.0024" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default DicesIcon
