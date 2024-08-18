import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableHeading } from './tableHeading.type'

const TableHeading: BaseProps<ITableHeading> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-header`]: true,
    [`${className}`]: className,
  })

  return <th className={classList}>{children}</th>
}

export default TableHeading
