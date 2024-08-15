import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import Link from 'next/link'
import { ListLinkProps } from './listLink.types'

export const ListLink: BaseProps<ListLinkProps> = (props) => {
  const { children, className, ...restProps } = props

  const classList = classNames({
    [`list-link`]: true,
    [`${className}`]: className,
  })

  return (
    <Link className={classList} {...restProps}>
      {children}
    </Link>
  )
}

export default ListLink
