import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ListItemProps } from './listItem.types'

export const ListItem: BaseProps<ListItemProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`list-item`]: true,
    [`${className}`]: className,
  })

  return <li className={classList}>{children}</li>
}

export default ListItem
