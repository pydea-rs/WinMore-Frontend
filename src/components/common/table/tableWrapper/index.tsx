import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const TableWrapper: BaseProps<ElementProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`overflow-x-auto`]: true,
    [`${className}`]: className,
  })
  return <div className={classList}>{children}</div>
}

export default TableWrapper
