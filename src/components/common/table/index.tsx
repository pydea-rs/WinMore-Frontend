import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'

const Table: BaseProps<ElementProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`table`]: true,
    [`${className}`]: className,
  })

  return <table className={classList}>{children}</table>
}

export default Table
