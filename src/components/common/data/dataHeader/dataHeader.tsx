import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDataHeader } from './dataHeader.types'

const DataHeader: BaseProps<IDataHeader> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`data-header`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default DataHeader
