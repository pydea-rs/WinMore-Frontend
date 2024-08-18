import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IFooter } from './footer.types'

const Footer: BaseProps<IFooter> = (props) => {
  const { className, children } = props

  const classList = classNames({
    [`footer`]: true,
    [`${className}`]: className,
  })

  return <footer className={classList}>{children}</footer>
}

export default Footer
