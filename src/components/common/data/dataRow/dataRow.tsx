import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDataRow } from './dataRow.types'

const DataRow: BaseProps<IDataRow> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`data-row`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default DataRow
