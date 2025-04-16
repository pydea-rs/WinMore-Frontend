import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const TableBody: BaseProps<ElementProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [``]: true,
    [`${className}`]: className,
  })

  return <tbody className={classList}>{children}</tbody>
}

export default TableBody
