import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ICasinoSquareIcon } from './casinoSquare.types'

const CasinoSquareIcon: BaseProps<ICasinoSquareIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5019 2.99658H7.49776C5.29038 3.00304 3.50255 4.79087 3.49609 6.99825V17.0024C3.50255 19.2098 5.29038 20.9976 7.49776 21.0041H17.5019C19.7093 20.9976 21.4971 19.2098 21.5036 17.0024V6.99825C21.4971 4.79087 19.7093 3.00304 17.5019 2.99658Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0004 12.0002C13.0004 12.2765 12.7765 12.5004 12.5002 12.5004C12.224 12.5004 12 12.2765 12 12.0002C12 11.724 12.224 11.5 12.5002 11.5"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5001 11.5001C12.7764 11.5001 13.0003 11.7241 13.0003 12.0003"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.184 8.81661C16.184 9.09287 15.9601 9.31682 15.6838 9.31682C15.4075 9.31682 15.1836 9.09287 15.1836 8.81661C15.1836 8.54036 15.4075 8.31641 15.6838 8.31641"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6837 8.31651C15.96 8.31651 16.1839 8.54046 16.1839 8.81672"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.81682 15.1833C9.81682 15.4596 9.59287 15.6835 9.31661 15.6835C9.04036 15.6835 8.81641 15.4596 8.81641 15.1833C8.81641 14.9071 9.04036 14.6831 9.31661 14.6831"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.31651 14.6832C9.59277 14.6832 9.81672 14.9072 9.81672 15.1834"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CasinoSquareIcon
