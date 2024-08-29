import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITable } from './table.types'

const Table: BaseProps<ITable> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table`]: true,
    [`${className}`]: className,
  })

  return <table className={classList}>{children}</table>
}

export default Table
