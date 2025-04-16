import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const TableRow: BaseProps<ElementProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-row`]: true,
    [`${className}`]: className,
  })

  return <tr className={classList}>{children}</tr>
}

export default TableRow
