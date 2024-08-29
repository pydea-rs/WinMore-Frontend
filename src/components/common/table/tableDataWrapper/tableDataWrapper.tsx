import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableDataWrapper } from './tableDataWrapper.types'

const TableDataWrapper: BaseProps<ITableDataWrapper> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-data-wrapper`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default TableDataWrapper
