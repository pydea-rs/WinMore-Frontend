import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableHeader } from './tableHeader.types'

const TableHeader: BaseProps<ITableHeader> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [``]: true,
    [`${className}`]: className,
  })

  return <thead className={classList}>{children}</thead>
}

export default TableHeader
