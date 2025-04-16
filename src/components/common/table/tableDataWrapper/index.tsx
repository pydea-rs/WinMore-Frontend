import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const TableDataWrapper: BaseProps<ElementProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table-data-wrapper`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default TableDataWrapper
