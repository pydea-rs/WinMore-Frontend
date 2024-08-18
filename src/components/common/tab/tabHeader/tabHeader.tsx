import { BaseProps } from '@/types/global.types'
import { TabList } from '@headlessui/react'
import classNames from 'classnames'
import { ITabHeader } from './tabHeader.types'

const TabHeader: BaseProps<ITabHeader> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`tab-header`]: true,
    [`${className}`]: className,
  })

  return <TabList className={classList}>{children}</TabList>
}

export default TabHeader
