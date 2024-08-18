import { BaseProps } from '@/types/global.types'
import { TabPanel } from '@headlessui/react'
import classNames from 'classnames'
import { ITabContent } from './tabContent.types'

const TabContent: BaseProps<ITabContent> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`tab-content`]: true,
    [`${className}`]: className,
  })

  return <TabPanel className={classList}>{children}</TabPanel>
}

export default TabContent
