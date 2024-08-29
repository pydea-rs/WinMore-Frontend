import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITelegramIcon } from './telegram.type'

const TelegramIcon: BaseProps<ITelegramIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.795 17.3772L9.72995 19.3862C9.37195 19.7342 8.77295 19.5802 8.62795 19.1022L7.25195 14.5722"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1041 11.3982C14.1041 11.3982 11.5151 13.7342 10.1871 14.9332C9.79008 15.2912 9.82308 15.9212 10.2531 16.2382L15.6311 20.2112C16.1601 20.6022 16.9161 20.3152 17.0531 19.6712L19.6941 7.22418C19.8221 6.62218 19.2311 6.11918 18.6571 6.34018L3.14208 12.3242C2.68508 12.5002 2.70708 13.1532 3.17408 13.2992L7.25108 14.5712"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default TelegramIcon
