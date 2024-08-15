import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ListProps } from './list.types'

const List: BaseProps<ListProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`list`]: true,
    [`${className}`]: className,
  })

  return <ul className={classList}>{children}</ul>
}

export default List
