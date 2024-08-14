import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import Link from 'next/link'
import { ListExternalLinkProps, ListItemProps, ListLinkProps, ListProps } from './list.types'

const List: BaseProps<ListProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`list`]: true,
    [`${className}`]: className,
  })

  return <ul className={classList}>{children}</ul>
}

export const ListItem: BaseProps<ListItemProps> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`list-item`]: true,
    [`${className}`]: className,
  })

  return <li className={classList}>{children}</li>
}

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

export const ListExternalLink: BaseProps<ListExternalLinkProps> = (props) => {
  const { children, className, ...restProps } = props

  const classList = classNames({
    [`list-link`]: true,
    [`${className}`]: className,
  })

  return (
    <a className={classList} {...restProps}>
      {children}
    </a>
  )
}

export default List
