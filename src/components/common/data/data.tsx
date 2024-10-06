import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IDataComponent } from './data.types'

const Data: BaseProps<IDataComponent> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`data`]: true,
    [`${className}`]: className,
  })

  return <div className={classList}>{children}</div>
}

export default Data
