import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDiscordIcon } from './discord.type'

const DiscordIcon: BaseProps<IDiscordIcon> = (props) => {
  const { className } = props

  const classList = classNames({
    [`${className}`]: className,
  })
  return (
    <svg className={classList} width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 7.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.707 13.793L16.293 17.207C16.105 17.395 15.851 17.5 15.586 17.5H12L8 21.5V17.5H5C4.448 17.5 4 17.052 4 16.5V7.914C4 7.649 4.105 7.394 4.293 7.207L7.707 3.793C7.895 3.605 8.149 3.5 8.414 3.5H19C19.552 3.5 20 3.948 20 4.5V13.086C20 13.351 19.895 13.605 19.707 13.793Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DiscordIcon
