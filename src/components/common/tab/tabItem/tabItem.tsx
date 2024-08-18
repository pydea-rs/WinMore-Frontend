import { BaseProps } from '@/types/global.types'
import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { ITabItem } from './tabItem.types'

const TabItem: BaseProps<ITabItem> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`tab-item`]: true,
    [`${className}`]: className,
  })

  return <Tab className={classList}>{children}</Tab>
}

export default TabItem
