import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableWrapper } from './tableWrapper.type'

const TableWrapper: BaseProps<ITableWrapper> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`overflow-x-auto`]: true,
    [`${className}`]: className,
  })
  return <div className={classList}>{children}</div>
}

export default TableWrapper
