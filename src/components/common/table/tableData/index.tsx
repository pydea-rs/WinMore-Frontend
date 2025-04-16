import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const TableData: BaseProps<ElementProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-data`]: true,
    [`${className}`]: className,
  })

  return <td className={classList}>{children}</td>
}

export default TableData
