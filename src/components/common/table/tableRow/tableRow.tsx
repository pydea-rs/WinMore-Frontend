import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableRow } from './tableRow.types'

const TableRow: BaseProps<ITableRow> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-row`]: true,
    [`${className}`]: className,
  })

  return <tr className={classList}>{children}</tr>
}

export default TableRow
