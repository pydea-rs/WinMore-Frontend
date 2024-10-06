import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDataCol } from './dataCol.types'

const DataCol: BaseProps<IDataCol> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`data-col`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default DataCol
