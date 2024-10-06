import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDataHeading } from './dataHeading.types'

const DataHeading: BaseProps<IDataHeading> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`data-header`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default DataHeading
