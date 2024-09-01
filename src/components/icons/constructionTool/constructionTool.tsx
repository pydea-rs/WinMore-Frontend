import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IConstructionToolIcon } from './constructionTool.types'

const ConstructionTool: BaseProps<IConstructionToolIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="transparent">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33413 10.6586L5.0623 19.6562C4.92954 20.0213 5.02028 20.4303 5.295 20.705C5.56972 20.9797 5.97869 21.0704 6.34382 20.9377L15.3414 17.6658C15.6626 17.549 15.9019 17.2763 15.9759 16.9426C16.0499 16.609 15.9484 16.2606 15.7067 16.019L9.98099 10.2932C9.73932 10.0516 9.39097 9.9501 9.05733 10.0241C8.72368 10.0981 8.45094 10.3374 8.33413 10.6586Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7728 9.77292L18.4727 5.073C19.1757 4.37 19.1757 3.23021 18.4727 2.52722V2.52722C18.1351 2.18963 17.6772 1.99997 17.1998 1.99997C16.7224 1.99997 16.2645 2.18963 15.9269 2.52722L11.9341 6.52C11.5436 6.91052 11.5436 7.54368 11.9341 7.93421L13.7728 9.77292Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path
        d="M11.9342 7.93417L14.2929 10.2929C14.4804 10.4804 14.5858 10.7348 14.5858 11C14.5858 11.2652 14.4804 11.5196 14.2929 11.7071L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
    </svg>
  )
}

export default ConstructionTool
