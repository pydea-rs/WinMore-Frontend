import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

import { ListTextProps } from './listText.types'

export const ListText: BaseProps<ListTextProps> = (props) => {
  const { children, className, ...restProps } = props

  const classList = classNames({
    [`list-text`]: true,
    [`${className}`]: className,
  })

  return (
    <span className={classList} {...restProps}>
      {children}
    </span>
  )
}

export default ListText
