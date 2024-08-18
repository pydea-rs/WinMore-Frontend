import { BaseProps } from '@/types/global.types'
import { TabGroup } from '@headlessui/react'
import classNames from 'classnames'
import { ITab } from './tab.types'

const Tab: BaseProps<ITab> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`tab`]: true,
    [`${className}`]: className,
  })

  return <TabGroup className={classList}>{children}</TabGroup>
}

export default Tab
