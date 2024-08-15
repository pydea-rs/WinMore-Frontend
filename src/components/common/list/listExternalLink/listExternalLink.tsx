import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { ListExternalLinkProps } from './listExternalLink.types'

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

export default ListExternalLink
