import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDataBody } from './dataBody.types'

const DataBody: BaseProps<IDataBody> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`data-body`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default DataBody
