import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITableBody } from './tableBody.type'

const TableBody: BaseProps<ITableBody> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [``]: true,
    [`${className}`]: className,
  })

  return <tbody className={classList}>{children}</tbody>
}

export default TableBody
