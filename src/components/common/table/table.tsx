import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ITable } from './table.type'

const Table: BaseProps<ITable> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`overflow-x-auto`]: true,
    [`${className}`]: className,
  })

  return <table className={classList}>{children}</table>
}

export default Table
