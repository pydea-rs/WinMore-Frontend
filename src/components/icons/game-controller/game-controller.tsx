import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IGameControllerIcon } from './game-controller.type'

const GameControllerIcon: BaseProps<IGameControllerIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 8.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6493 5.37613C14.7148 3.54129 9.28519 3.54129 4.35071 5.37613C3.48453 5.72306 2.83455 6.46068 2.59936 7.36364C1.77223 10.933 1.80122 14.6473 2.68397 18.2033C2.8628 18.8469 3.35075 19.3589 3.98497 19.5685L5.12397 19.948C5.62475 20.1171 6.17033 19.8654 6.3669 19.3748C6.76737 18.3736 7.4147 16.7552 7.76836 15.8712C7.92004 15.4924 8.28753 15.2445 8.69559 15.2457H15.3041C15.7131 15.2457 16.0808 15.4946 16.2327 15.8743L17.631 19.3706C17.8277 19.8622 18.3735 20.1154 18.8758 19.9479L20.0152 19.568C20.6494 19.3584 21.1372 18.8464 21.316 18.2029C22.1987 14.6471 22.2276 10.9329 21.4006 7.36368C21.1654 6.46071 20.5155 5.72307 19.6493 5.37613Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.35 10.0002C14.3499 10.0968 14.2716 10.175 14.175 10.175C14.0784 10.1749 14.0001 10.0966 14 10C14 9.90345 14.0782 9.82509 14.1748 9.82497C14.2213 9.82491 14.2659 9.84335 14.2988 9.87623C14.3317 9.9091 14.3501 9.9537 14.35 10.0002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10.0002C17.9998 10.0968 17.9215 10.175 17.8249 10.175C17.7283 10.1749 17.65 10.0966 17.65 10C17.6499 9.90345 17.7281 9.82509 17.8247 9.82497C17.8712 9.82491 17.9158 9.84335 17.9487 9.87623C17.9816 9.9091 18 9.9537 18 10.0002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0002 11.65C16.0968 11.6501 16.175 11.7285 16.175 11.8251C16.175 11.9217 16.0967 12 16.0001 12C15.9035 12 15.8251 11.9218 15.825 11.8252C15.8249 11.7787 15.8434 11.7341 15.8763 11.7013C15.9091 11.6684 15.9537 11.6499 16.0002 11.65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0002 8C16.0968 8.00012 16.175 8.07848 16.175 8.17508C16.175 8.27167 16.0967 8.34996 16.0001 8.35C15.9035 8.35004 15.8251 8.27182 15.825 8.17522C15.8249 8.12873 15.8434 8.08413 15.8763 8.05126C15.9091 8.01839 15.9537 7.99994 16.0002 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default GameControllerIcon
