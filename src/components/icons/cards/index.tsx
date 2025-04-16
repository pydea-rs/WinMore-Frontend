import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const CardsIcon: BaseProps<ElementProps> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4441 22H5.11106C3.94506 22 3.00006 21.055 3.00006 19.889V9.33298C3.00006 8.16698 3.94506 7.22198 5.11106 7.22198H11.4441C12.6101 7.22198 13.5551 8.16698 13.5551 9.33298V19.889C13.5561 21.055 12.6101 22 11.4441 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transition"
      />
      <path
        d="M9.75208 7.22202L10.7311 3.56502C11.0331 2.43902 12.1911 1.77002 13.3171 2.07202L19.4341 3.71102C20.5601 4.01302 21.2291 5.17002 20.9271 6.29702L18.1951 16.493C17.8931 17.619 16.7361 18.288 15.6101 17.986L13.5551 17.436"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transition"
      />
    </svg>
  )
}
export default CardsIcon
