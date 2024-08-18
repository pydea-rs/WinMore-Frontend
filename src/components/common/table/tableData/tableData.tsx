import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableData } from './tableData.type'

const TableData: BaseProps<ITableData> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-data`]: true,
    [`${className}`]: className,
  })

  return <td className={classList}>{children}</td>
}

export default TableData
